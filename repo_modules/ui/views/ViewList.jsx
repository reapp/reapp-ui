var React = require('react');
var Component = require('ui/component');
var { Scroller } = require('scroller');
var TitleBar = require('../components/TitleBar');
var TouchableArea = require('../helpers/TouchableArea');
var Transforms = require('../lib/Transforms');
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
    return nextState.step % 1 === 0;
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

    if (step % 1 !== 0) {
      var newVisibleIndex = [ Math.floor(step), Math.ceil(step) ]
        .filter(i => !this.visibleViews[i])[0];

      if (newVisibleIndex >= 0) {
        this.visibleViews[newVisibleIndex] = true;
        this.callProperty('onViewEntering', newVisibleIndex);
      }
    }
    else {
      this.callProperty('onViewEntered', step);

      var prev = step-1;
      var next = step+1;

      if (this.visibleViews[prev]) {
        this.callProperty('onViewLeft', prev);
        this.visibleViews[prev] = false;
      }
      else if (this.visibleViews[next]) {
        this.callProperty('onViewLeft', next);
        this.visibleViews[next] = false;
      }
    }
  },

  callProperty(name) {
    if (this.props[name])
      this.props[name].apply(this, Array.prototype.slice.call(arguments, 1));
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
        index: i,
        active: this.isOnStage(i)
      }, titleBarProps);

      curTitleBarProps.style = Object.assign({
        background: 'transparent'
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
    var { after, before, touchStartBounds, ...props } = this.props;
    var titles = this.makeTitles(this.views.titles);
    var views = this.makeViews(this.views.contents);
    var viewListProps = Object.assign({
      ignoreY: true,
      scroller: this.scroller,
      touchStartBounds: touchStartBounds,
      onTouchStart: this.handleTouchStart,
      onTouchEnd: this.handleTouchEnd,
      onClick: this.handleClick
    }, props);

    if (this.state.step === 0)
      this.addStyles(this.styles.underTouchable);

    return (
      <TouchableArea {...this.componentProps()} {...viewListProps}>
        {before}
        {titles}
        {views}
        {after}
      </TouchableArea>
    );
  }
});