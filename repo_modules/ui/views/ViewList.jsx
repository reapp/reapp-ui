var React = require('react');
var Merge = require('react/lib/merge');
var TitleBar = require('../components/TitleBar');
var ToolbarStyle = require('../style/Toolbar');
var TouchableArea = require('../helpers/TouchableArea');
var Transforms = require('../animations/Transforms');
var View = require('./View');
var { Scroller } = require('scroller');

require('./ViewList.styl');

var ViewList = React.createClass({
  mixins: [Transforms.Mixin],

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

  componentWillReceiveProps(nextProps) {
    if (this.props.views !== nextProps.views)
      this.getTitlesAndContents(nextProps.views);
  },

  componentWillMount() {
    this.setupViewEnterStates();
    this.getTitlesAndContents(this.props.views);
  },

  componentDidMount() {
    this.setupDimensions();
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
    var titleBars = titles.map((title, i) => (
      TitleBar({
        left: title[0],
        right: title[2],
        index: i,
        style: ToolbarStyle({
          background: 'transparent',
          pointerEvents: 'all',
          display: this.isOnStage(i) ? 'inherit' : 'none'
        })
      }, title[1])
    ));

    return titleBars && titleBars.length ?
      <div style={ToolbarStyle()}>{titleBars}</div> :
      null;
  },

  makeViews(contents) {
    return Object.keys(contents).map((id, i) => (
      View({
        key: i,
        id: id,
        'data-transform': this.props.transform,
        'data-transform-index': i,
        'data-width': this.state.width,
        style: {
          display: this.isOnStage(i) ? 'inherit' : 'none'
        }
      }, contents[id])
    ));
  },

  styles(state) {
    return {
      flexFlow: 'row'
    };
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
    var Titles = this.makeTitles(this.views.titles);
    var Views = this.makeViews(this.views.contents);

    return TouchableArea({
      className: 'ViewList',
      style: this.styles(this.state),
      scroller: this.scroller,
      ignoreY: true,
      touchStartBounds: this.props.touchStartBounds,
      onTouchStart: this.handleTouchStart,
      onTouchEnd: this.handleTouchEnd,
      onClick: this.handleClick
    }, Titles, Views);
  }
});

module.exports = ViewList;