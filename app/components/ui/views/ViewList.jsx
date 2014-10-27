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
    this.scroller = new Scroller(this.handleScroll, {
      snapping: true
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
    console.log('handle scroll', left, this.state.width);
    this.setState({
      left: left,
      step: left / this.state.width
    });
  },

  getTitlesAndContents(views) {
    var result = {
      titles: { l: [], m: [], r: [] },
      contents: []
    };

    views.map(view => {
      var title = view.title;

      if (Array.isArray(title)) {
        if (title[0]) result.titles.l.push(title[0]);
        if (title[1]) result.titles.m.push(title[1]);
        if (title[2]) result.titles.r.push(title[2]);
      }
      else {
        result.titles.m.push(title);
      }

      result.contents.push(view.content);
    });

    return result;
  },

  makeTitleBar(titles) {
    return TitleBar({
      left: titles.l,
      right: titles.r,
      step: this.state.step
    }, titles.m);
  },

  makeViews(contents) {
    return contents.map((content, i) => {
      if (this.state.step < i-1 || this.state.step > i+1)
        return null;

      return AnimatableView({
        key: i,
        index: i,
        touching: this.isTouching || false,
        step: this.state.step,
        left: this.state.left,
        width: this.state.width,
        height: this.state.height
      }, content);
    });
  },

  styles(state) {
    return {
      width: this.state.width,
      height: this.state.height,
      flexFlow: 'row'
    };
  },

  onTouchStart() {
    this.isTouching = true;
  },

  onTouchEnd() {
    this.isTouching = false;
  },

  render() {
    var { titles, contents } = this.getTitlesAndContents(this.props.views);
    var TitleBar = this.makeTitleBar(titles);
    var Views = this.makeViews(contents);

    return TouchableArea({
      className: 'ViewList',
      style: this.styles(this.state),
      scroller: this.scroller,
      touchStartBounds: {
        x: [{ from: 0, to: 10 }, { from: this.state.width-10, to: this.state.width }]
      },
      onTouchStart: this.onTouchStart,
      onTouchEnd: this.onTouchEnd
    }, TitleBar, Views);
  }
});

module.exports = ViewList;