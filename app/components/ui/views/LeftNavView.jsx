var React = require('react');
var AnimatableContainer = require('../helpers/AnimatableContainer');
var LeftNavBehavior = require('./LeftNavBehavior');
var TouchableArea = require('../helpers/TouchableArea');
var { Scroller } = require('scroller');

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
    if (this.isNavOpen()) {
      this.scroller.scrollTo(this.props.sideWidth, 0, true);
    } else {
      this.scroller.scrollTo(0, 0, true);
    }
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
    console.log(this.state, this.props.sideWidth, this.isNavOpen())
    // props:
    // sideWidth
    // topHeight
    // topContent
    // button
    // sideContent
    // children (big content area)
    var sidebarX = (this.props.sideWidth - this.state.scrollLeft);

    var side = null;

    // TODO: we could do this with style calc
    var sideStyle = {
      bottom: 0,
      left: this.props.sideWidth * -1,
      position: 'absolute',
      top: 0,
      width: this.props.sideWidth
    };

    var behavior = this.props.behavior;

    if (this.isNavOpen()) {
      side = AnimatableContainer({
        style: sideStyle,
        translate: behavior.side.translate(this.props.sideWidth, this.state.scrollLeft),
        rotate: behavior.side.rotate(this.props.sideWidth, this.state.scrollLeft),
        opacity: behavior.side.opacity(this.props.sideWidth, this.state.scrollLeft)
      }, this.props.sideContent);
    }

    var contentTouchableAreaStyle = {
      bottom: 0,
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0
    };

    var topStyle = {
      height: this.props.topHeight,
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0
    };

    var contentStyle = {
      bottom: 0,
      left: 0,
      position: 'absolute',
      right: 0,
      top: this.props.topHeight
    };

    return this.transferPropsTo(
      React.DOM.div(null,
        side,
        AnimatableContainer(
          {style:contentStyle,
          translate:behavior.content.translate(this.props.sideWidth, this.state.scrollLeft),
          rotate:behavior.content.rotate(this.props.sideWidth, this.state.scrollLeft),
          opacity:behavior.content.opacity(this.props.sideWidth, this.state.scrollLeft)},
          TouchableArea(
            {style:contentTouchableAreaStyle,
            scroller:this.scroller,
            touchable:this.isNavOpen(),
            onTouchTap:this._handleContentTouchTap},
            this.props.children
          )
        ),
        AnimatableContainer(
          {style:topStyle,
          translate:behavior.top.translate(this.props.sideWidth, this.state.scrollLeft),
          rotate:behavior.top.rotate(this.props.sideWidth, this.state.scrollLeft),
          opacity:behavior.top.opacity(this.props.sideWidth, this.state.scrollLeft)},
          TouchableArea(
            {onTouchTap:this._handleTap,
            scroller:this.scroller},
            this.props.button
          ),
          this.props.topContent
        )
      )
    );
  }
});

module.exports = LeftNavView;