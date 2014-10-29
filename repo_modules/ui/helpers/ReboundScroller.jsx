var React = require('react');
var AnimatableContainer = require('./AnimatableContainer');
var TouchableArea = require('./TouchableArea');
var { Scroller } = require('../lib/animate/ReboundScroller');

var ANIMATABLE_CONTAINER_STYLE = {
  bottom: 0,
  left: 0,
  position: 'absolute',
  right: 0,
  top: 0
};

var ReboundScroller = React.createClass({
  getInitialState() {
    return {left: 0, top: 0};
  },

  componentWillMount() {
    this.scroller = new Scroller(this.handleScroll, this.props.options);
    this.configured = false;
  },

  componentDidMount() {
    this.configure();
  },

  componentDidUpdate() {
    this.configure();
  },

  configure() {
    if (this.configured) {
      return;
    }
    this.configured = true;
    var node = this.refs.content.getDOMNode();
    this.scroller.setDimensions(
      this.getDOMNode().clientWidth,
      this.getDOMNode().clientHeight,
      node.clientWidth,
      node.clientHeight
    );
  },

  handleScroll(left, top) {
    // TODO: zoom
    this.setState({
      left: left,
      top: top
    });
  },

  render() {
    return this.transferPropsTo(
      <TouchableArea scroller={this.scroller} style={{overflow: 'hidden'}}>
        <AnimatableContainer
          translate={{x: -1 * this.state.left, y: -1 * this.state.top}}
          style={ANIMATABLE_CONTAINER_STYLE}>
          <div ref="content">{this.props.children}</div>
        </AnimatableContainer>
      </TouchableArea>
    );
  }
});

module.exports = ReboundScroller;