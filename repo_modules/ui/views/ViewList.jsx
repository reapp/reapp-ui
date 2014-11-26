var React = require('react');
var Component = require('ui/component');
var { Scroller } = require('scroller');
var TitleBar = require('../components/TitleBar');
var TouchableArea = require('../helpers/TouchableArea');
var Transforms = require('../animations/Transforms');
var View = require('./View');

module.exports = Component('ViewList', {
  mixins: [Transforms.TransformerMixin],

  propTypes: {
    onTouchStart: React.PropTypes.func,
    onTouchEnd: React.PropTypes.func,
    onViewEnter: React.PropTypes.func,
    onViewLeave: React.PropTypes.func,
  },

  getDefaultProps() {
    return {
      transform: 'VIEW_PARALLAX',
      touchStartBounds: {
        x: [
          { from: 0, to: 10 } // draggable only from left edge
        ]
      }
    };
  },

  getInitialState() {
    return {
      width: 0,
      step: 0
    };
  },

  // only update on even steps
  shouldComponentUpdate(nextProps, nextState) {
    return nextState.step % 1 !== 0;
  },

  componentWillReceiveProps(nextProps) {
    if (this.props.views !== nextProps.views)
      this.getTitlesAndContents(nextProps.views);
  },

  componentWillMount() {
    this.setupViewEnterStates();
    this.getTitlesAndContents(this.props.views);
    this.setupDimensions();
  },

  componentDidMount() {
    window.addEventListener('resize', this.setupDimensions);
  },

  componentWillUnmount() {
    window.removeEventListener('resize', this.setupDimensions);
  },

  setupDimensions() {
    var width = this.props.width || window.innerWidth;
    var height = this.props.height || window.innerHeight;
    this.setState({ width, height });
    this.setupScroller(width, height);
  },

  setupScroller(width, height) {
    this.scroller = new Scroller(this.handleScroll, {
      paging: true,
      bouncing: false,
      scrollingY: false
    });

    this.scroller.setSnapSize(width, height);
    this.scroller.setDimensions(
      width,
      height,
      width * this.props.views.length,
      height
    );
  },

  setupViewEnterStates() {
    this.visibleViews = this.props.views.map(v => false);
    this.visibleViews[0] = true;
  },

  handleScroll(left) {
    var step = this.state.width ? left / this.state.width : 0;

    this.setState({ step: step });
    this._doTransforms(step);

    if (this.props.onViewEnter) {
      if (step % 1 !== 0) {
        var newVisible = [ Math.floor(step), Math.ceil(step) ]
          // only one new view can enter at a time
          .filter(i => !this.visibleViews[i])[0];

        if (newVisible >= 0) {
          this.visibleViews[newVisible] = true;
          this.props.onViewEnter(newVisible);
        }
      }
      else {
        var prev = step-1;
        var next = step+1;

        if (this.visibleViews[prev]) {
          if (this.props.onViewLeave) this.props.onViewLeave(prev);
          this.visibleViews[prev] = false;
        }

        if (this.visibleViews[next]) {
          if (this.props.onViewLeave) this.props.onViewLeave(next);
          this.visibleViews[next] = false;
        }
      }
    }
  },

  getTitlesAndContents(views) {
    var index = 0;
    var result = {
      titles: [],
      contents: {}
    };

    views.map(view => {
      var title = view.title;
      var id = view.id || ++index;

      result.titles.push(Array.isArray(title) ? title : [,title,]);
      result.contents[id] = view.content;
    });

    this.views = result;
  },

  isOnStage(index) {
    return (this.state.step-1 < index) && (index < this.state.step+1);
  },

  makeTitles(titles) {
    var titleBarProps = this.props.titleBarProps || {};

    var titleBars = titles.map((title, i) => {
      var curTitleBarProps = Object.assign({
        key: `title-${i}`,
        left: title[0],
        right: title[2],
        index: i
      }, titleBarProps);

      curTitleBarProps.style = Object.assign({
        background: 'transparent',
        pointerEvents: 'all',
        display: this.isOnStage(i) ? 'inherit' : 'none'
      }, titleBarProps.style);

      return (
        <TitleBar {...curTitleBarProps}>
          {title[1]}
        </TitleBar>
      );
    });

    var titleBarContainerStyles = [this.getStylesForComponent('TitleBar')]
      .concat(titleBarProps.height ?
        this.makeReactStyle({ height: titleBarProps.height }) :
        null);

    return titleBars && titleBars.length && (
      <div styles={titleBarContainerStyles}>{titleBars}</div>
    );
  },

  makeViews(contents) {
    var titleBarProps = this.props.titleBarProps;
    var titleBarHeight = titleBarProps && titleBarProps.height;

    return Object.keys(contents).map((id, i) => {
      var isOnStage = this.isOnStage(i);
      var viewProps = Object.assign({
        key: `view-${i}`,
        id: id,
        'data-transform': this.props.transform,
        'data-transform-index': i,
        'data-width': this.state.width,
        style: { display: isOnStage ? 'inherit' : 'none' }
      }, this.props.viewProps);

      if (titleBarHeight)
        viewProps.top = titleBarHeight;

      return (
        <View {...viewProps}>
          {contents[id]}
        </View>
      );
    });
  },

  handleTouchStart(e) {
    if (this.props.onTouchStart)
      this.props.onTouchStart(e);
  },

  handleTouchEnd(e) {
    if (this.props.onTouchEnd)
      this.props.onTouchEnd(e);
  },

  handleClick(e) {
    var hash = e.target.hash;
    if (!hash) return;

    var viewIndex = this.props.views.map(v => v.id).indexOf(hash.slice(1));

    if (viewIndex >= 0) {
      this.scroller.scrollTo(this.state.width * viewIndex, 0, true);
      e.preventDefault();
    }
  },

  render() {
    var titles = this.makeTitles(this.views.titles);
    var views = this.makeViews(this.views.contents);

    var viewListProps = Object.assign({
      scroller: this.scroller,
      ignoreY: true,
      touchStartBounds: this.props.touchStartBounds,
      onTouchStart: this.handleTouchStart,
      onTouchEnd: this.handleTouchEnd,
      onClick: this.handleClick
    }, this.props);

    if (this.state.step === 0)
      this.addStyles(this.styles.underTouchable);

    return (
      <TouchableArea {...this.componentProps()} {...viewListProps}>
        {titles}
        {views}
      </TouchableArea>
    );
  }
});