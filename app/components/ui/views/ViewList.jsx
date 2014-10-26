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

  render() {
    var titles = { l: [], m: [], r: [] };
    var contents = [];

    this.props.views.map(view => {
      var title = view.title;

      if (Array.isArray(title)) {
        if (title[0]) titles.l.push(title[0]);
        if (title[1]) titles.m.push(title[1]);
        if (title[2]) titles.r.push(title[2]);
      }
      else {
        titles.m.push(title);
      }

      contents.push(view.content);
    });

    var TitleBar = (
      <TitleBar left={titles.l} right={titles.r} step={this.state.step}>{titles.m}</TitleBar>
    );

    var views = contents.map(function(content, i) {
      if (this.state.left < (i - 1) * this.state.width ||
          this.state.left > (i + 1) * this.state.width) {
        return null;
      }

      // Find the highest resolution image
      return (
        <View
          left={this.state.left}
          key={i}
          index={i}
          url={url}
          width={this.state.width}
          height={this.state.height} />
      );
    }, this);

    return (
      <TouchableArea
        className="Viewer"
        style={{width: this.state.width, height: this.state.height}}
        styles={this.styles}
        scroller={this.scroller}>
        {images}
      </TouchableArea>
    );
  }
});

module.exports = ViewList;