var React = require('react');
var TitleBar = require('../components/TitleBar');
var TouchableArea = require('../helpers/TouchableArea');
var AnimatableView = require('./AnimatableView');
var { Scroller } = require('scroller');

require('./ViewList.styl');

var ViewList = React.createClass({
  getInitialState() {
    return {
      left: 0,
      step: 0
    };
  },

  componentWillMount() {
    this.getTitlesAndContents(this.props.views);

    this.scroller = new Scroller(this.handleScroll, {
      snapping: true,
      bouncing: false
    });

    var width = this.props.width || window.innerWidth;
    var height = this.props.height || window.innerHeight;

    this.setState({
      width: width,
      height: height
    });

    this.scroller.setDimensions(
      width,
      height,
      width * this.props.views.length,
      height
    );

    this.scroller.setSnapSize(width, height);
  },

  handleScroll(left) {
    this.setState({
      left: left,
      step: this.state.width ? left / this.state.width : 0
    });
  },

  getTitlesAndContents(views) {
    var index = 0;
    var result = {
      titles: {},
      contents: {}
    };

    views.map(view => {
      var title = view.title;
      var id = view.id || ++index;

      result.titles[id] = { left: null, mid: null, right: null };

      if (Array.isArray(title)) {
        if (title[0]) result.titles[id].left = title[0];
        if (title[1]) result.titles[id].mid = title[1];
        if (title[2]) result.titles[id].right = title[2];
      }
      else {
        result.titles[id].mid = title;
      }

      result.contents[id] = view.content;
    });

    this.views = result;
  },

  makeTitleBar(titles) {
    return TitleBar({
      titles: titles,
      step: this.state.step
    });
  },

  makeViews(contents) {
    return Object.keys(contents).map((id, i) => {
      var content = contents[id];

      if (this.state.step < i-1 || this.state.step > i+1)
        return null;

      return AnimatableView({
        key: i,
        index: i,
        id: id,
        touching: !!this.isBeingTouched,
        step: this.state.step,
        width: this.state.width,
        height: this.state.height
      }, [].concat(content));
    });
  },

  styles(state) {
    return {
      width: this.state.width,
      height: this.state.height,
      flexFlow: 'row'
    };
  },

  handleTouchStart() {
    this.isBeingTouched = true;
  },

  handleTouchEnd() {
    this.isBeingTouched = false;
  },

  handleClick(e) {
    var hash = e.target.hash;
    if (!hash) return;

    var viewIndex = this.props.views.map(v => v.id).indexOf(hash.slice(1));
    console.log('view index', viewIndex);

    if (viewIndex) {
      this.scroller.scrollTo(this.state.width * viewIndex, 0, true);
      e.preventDefault();
    }
  },

  render() {
    var TitleBar = this.makeTitleBar(this.views.titles);
    var Views = this.makeViews(this.views.contents);

    return TouchableArea({
      className: 'ViewList',
      style: this.styles(this.state),
      scroller: this.scroller,
      touchStartBounds: {
        x: [{ from: 0, to: 10 }, { from: this.state.width-10, to: this.state.width }]
      },
      onTouchStart: this.handleTouchStart,
      onTouchEnd: this.handleTouchEnd,
      onClick: this.handleClick
    }, TitleBar, Views);
  }
});

module.exports = ViewList;