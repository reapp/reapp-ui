var React = require('react');
var Merge = require('react/lib/merge');
var AnimatableContainer = require('../helpers/AnimatableContainer');
var LeftNavBehavior = require('./LeftNavBehavior');
var DraggableViewBehavior = require('./DraggableViewBehavior');
var TouchableArea = require('../helpers/TouchableArea');
var DraggableView = require('./DraggableView');
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
      behavior: LeftNavBehavior.ALL_PARALLAX_FADE
    };
  },

  _handleTap() {
    var scrollTo = this.isNavOpen() ? this.props.sideWidth : 0;
    this.scroller.scrollTo(scrollTo, 0, true);
  },

  _handleContentTouchTap(e) {
    if (!this.isNavOpen()) return;
    this.scroller.scrollTo(this.props.sideWidth, 0, true);
    e.preventDefault();
  },

  isNavOpen() {
    return this.state.scrollLeft !== this.props.sideWidth;
  },

  render() {
    // props: sideWidth, topHeight, topContent, handle, sideContent
    var isNavOpen = this.isNavOpen();
    var behavior = this.props.behavior;
    var side = null;

    var wrapperStyle = {
      overflowX: 'hidden',
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    };

    var sideStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: this.props.sideWidth * -1,
      width: this.props.sideWidth,
      zIndex: this.props.sideZIndex || 1
    };

    var sideContainerStyle = {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    };

    var sideProps = {
      translate: behavior.side.translate(this.props.sideWidth, this.state.scrollLeft),
      rotate: behavior.side.rotate(this.props.sideWidth, this.state.scrollLeft),
      opacity: behavior.side.opacity(this.props.sideWidth, this.state.scrollLeft)
    };

    if (isNavOpen) {
      side = AnimatableContainer(Merge(sideProps, { style: sideStyle }),
        React.DOM.div({style:sideContainerStyle, onClick:this._handleContentTouchTap},
          this.props.sideContent));
    }

    var draggableProps = {
      containerProps: {
        style: { left: 200 },
        translate: DraggableViewBehavior.translate(this.state.scrollLeft)
      },
      scroller: this.scroller,
      onTouchTap: this._handleContentTouchTap
    };

    var handleProps = draggableProps.containerProps;
    if (this.props.handleStyle)
      handleProps.style = Merge(this.props.handleStyle, handleProps.style);

    return this.transferPropsTo(
      React.DOM.div({style: wrapperStyle},
        // side
        side,
        // content
        DraggableView(draggableProps, this.props.children),
        // handle
        AnimatableContainer(handleProps,
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