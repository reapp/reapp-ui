var React = require('react');
var AnimatableContainer = require('../helpers/AnimatableContainer');
var LeftNavBehavior = require('./LeftNavBehavior');
var TouchableArea = require('../helpers/TouchableArea');
var { Scroller } = require('scroller');

var contentTouchableAreaStyle = {
  bottom: 0,
  left: 0,
  position: 'absolute',
  right: 0,
  top: 0
};

var wrapperStyle = {
  overflow: 'hidden',
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0
};

var LeftNavView = React.createClass({
  displayName: 'LeftNavView',

  componentWillMount() {
    this.scroller = new Scroller(this._handleScroll, {
      bouncing: false,
      scrollingX: true,
      scrollingY: false,
      snapping: true
    });
  },

  componentDidMount() {
    this._measure();
  },

  _measure() {
    var node = this.getDOMNode();
    this.scroller.setDimensions(
      node.clientWidth,
      node.clientHeight,
      node.clientWidth + this.props.sideWidth,
      node.clientHeight
    );
    this.scroller.setSnapSize(this.props.sideWidth, node.clientHeight);
    this.scroller.scrollTo(this.props.sideWidth, 0);
  },

  componentDidUpdate(prevProps) {
    if (this.props.sideWidth !== prevProps.sideWidth) {
      this._measure();
    }
  },

  closeNav() {
    if (this.isNavOpen()) {
      this.scroller.scrollTo(this.props.sideWidth, 0, true);
    }
  },

  _handleScroll(left, top, zoom) {
    this.setState({scrollLeft: left});
  },

  getInitialState() {
    return {scrollLeft: 0};
  },

  getDefaultProps() {
    return {
      behavior: LeftNavBehavior.PARALLAX_FADE
    };
  },

  _handleTap() {
    var scrollTo = this.isNavOpen() ? this.props.sideWidth : 0;
    this.scroller.scrollTo(scrollTo, 0, true);
  },

  _handleContentTouchTap(e) {
    if (!this.isNavOpen()) {
      return;
    }

    this.scroller.scrollTo(this.props.sideWidth, 0, true);
    e.preventDefault();
  },

  isNavOpen() {
    return this.state.scrollLeft !== this.props.sideWidth;
  },

  render() {
    // props: sideWidth, topHeight, topContent, handle, sideContent
    var behavior = this.props.behavior;
    var sidebarX = (this.props.sideWidth - this.state.scrollLeft);
    var side = null;
    var sideStyle = {
      bottom: 0,
      left: this.props.sideWidth * -1,
      position: 'fixed',
      top: 0,
      width: this.props.sideWidth,
      zIndex: 1
    };

    var contentStyle = {
      top: 0,
      bottom: 0,
      left: 0,
      position: 'absolute',
      right: 0,
      zIndex: 99
    };

    if (this.isNavOpen()) {
      side = AnimatableContainer({
        style: sideStyle,
        translate: behavior.side.translate(this.props.sideWidth, this.state.scrollLeft),
        rotate: behavior.side.rotate(this.props.sideWidth, this.state.scrollLeft),
        opacity: behavior.side.opacity(this.props.sideWidth, this.state.scrollLeft)
      }, this.props.sideContent);
    }

    return this.transferPropsTo(
      React.DOM.div({style: wrapperStyle},
        side,
        AnimatableContainer({
          style: contentStyle,
          translate: behavior.content.translate(this.props.sideWidth, this.state.scrollLeft),
          rotate: behavior.content.rotate(this.props.sideWidth, this.state.scrollLeft),
          opacity: behavior.content.opacity(this.props.sideWidth, this.state.scrollLeft)
        },
          TouchableArea({
            style: contentTouchableAreaStyle,
            scroller: this.scroller,
            touchable: this.isNavOpen(),
            onTouchTap: this._handleContentTouchTap
          }, this.props.children)
        ),
        AnimatableContainer({
          style: this.props.handleStyle,
          translate: behavior.top.translate(this.props.sideWidth, this.state.scrollLeft),
          rotate: behavior.top.rotate(this.props.sideWidth, this.state.scrollLeft),
          opacity: behavior.top.opacity(this.props.sideWidth, this.state.scrollLeft)
        },
          TouchableArea({
            onTouchTap:this._handleTap,
            scroller:this.scroller
          }, this.props.handle)
        )
      )
    );
  }
});

module.exports = LeftNavView;