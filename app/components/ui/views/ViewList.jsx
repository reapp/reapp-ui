var React = require('react');
var TitleBar = require('../components/TitleBar');
var TouchableArea = require('../helpers/TouchableArea');
var View = require('./View');
var { Scroller } = require('scroller');

var ViewList = React.createClass({
  getInitialState() {
    return { left: 0 };
  },

  componentWillMount() {
    this.scroller = new Scroller(this.handleScroll, {
      snapping: true
    });
  },

  componentDidMount() {
    var node = this.getDOMNode();
    var width = this.props.width || node.clientWidth;
    var height = this.props.height || node.clientHeight;

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
    this.handleScroll();
  },

  handleScroll(left) {
    this.setState({
      left: left,
      step: left / this.state.width
    });
  },

  getTitlesAndContents() {
    var result = {
      titles: { l: [], m: [], r: [] },
      contents: []
    };

    this.props.views.map(view => {
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

      return View({
        key: i,
        index: i,
        left: this.state.left,
        width: this.state.width,
        height: this.state.height
      }, content);
    });
  },

  render() {
    var { titles, contents } = this.getTitlesAndContents();
    var TitleBar = this.makeTitleBar(titles);
    var Views = this.makeViews(contents);

    return TouchableArea({
      className: 'ViewList',
      style: { width: this.state.width, height: this.state.height },
      scroller: this.scroller
    }, TitleBar, Views);
  }
});

module.exports = ViewList;