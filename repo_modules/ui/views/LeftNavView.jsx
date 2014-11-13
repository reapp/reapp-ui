var React = require('react');
var AnimatableContainer = require('../helpers/AnimatableContainer');
var LeftNavBehavior = require('./LeftNavBehavior');
var DraggableViewBehavior = require('./DraggableViewBehavior');
var TouchableArea = require('../helpers/TouchableArea');
var DraggableView = require('./DraggableView');
var { Scroller } = require('scroller');

var LeftNavView = React.createClass({
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
    if (this.props.sideWidth !== prevProps.sideWidth)
      this._measure();
  },

  closeNav() {
    if (this.isNavOpen())
      this.scroller.scrollTo(this.props.sideWidth, 0, true);
  },

  _handleScroll(left) {
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
    var {
      behavior,
      sideWidth,
      sideZIndex,
      topHeight,
      topContent,
      handle,
      handleStyle,
      sideContent,
      children,
      ...props } = this.props;

    var isNavOpen = this.isNavOpen();
    var side = null;

    if (isNavOpen) {
      var navProps = Object.assign({}, sideProps, { style: sideStyle });
    }

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
      left: sideWidth * -1,
      width: sideWidth,
      zIndex: sideZIndex || 1
    };

    var sideContainerStyle = {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    };

    var sideProps = {
      translate: behavior.parent.translate(sideWidth, this.state.scrollLeft),
      rotate: behavior.parent.rotate(sideWidth, this.state.scrollLeft),
      opacity: behavior.parent.opacity(sideWidth, this.state.scrollLeft)
    };

    var draggableProps = {
      viewProps: {
        style: { paddingTop: 0 }
      },
      containerProps: {
        layer: 1,
        style: {
          left: 200,
          marginLeft: 0
        },
        translate: DraggableViewBehavior.translate(this.state.scrollLeft)
      },
      scroller: this.scroller,
      onTouchTap: this._handleContentTouchTap
    };

    var handleProps = draggableProps.containerProps;
    if (handleStyle)
      handleProps.style = Object.assign({}, handleStyle, handleProps.style);

    return (
      <div style={wrapperStyle}>
        {isNavOpen && (
          <AnimatableContainer {...navProps}>
            <div style={sideContainerStyle} onClick={this._handleContentTouchTap}>
              {sideContent}
            </div>
          </AnimatableContainer>
        )}
        <DraggableView {...draggableProps}>
          {children}
          <TouchableArea onClick={this._handleTap} scroller={this.scroller}>
            {handle}
          </TouchableArea>
        </DraggableView>
      </div>
    );
  }
});

module.exports = LeftNavView;