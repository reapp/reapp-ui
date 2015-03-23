var React = require('react/addons');
var Component = require('../component');
var AnimatableContainer = require('../helpers/AnimatableContainer');
var LeftNavBehavior = require('../behaviors/LeftNavBehavior');
var Drawer = require('../components/Drawer');
var DrawerBehavior = require('../behaviors/DrawerBehavior');
var TouchableArea = require('../helpers/TouchableArea');
var StaticContainer = require('../helpers/StaticContainer');
var Scrollable = require('../mixins/Scrollable');
var Tappable = require('../helpers/Tappable');
var clone = require('../lib/niceClone');

module.exports = Component({
  name: 'LayoutLeftNav',

  propTypes: {
    behavior: React.PropTypes.object,
    sideWidth: React.PropTypes.number,
    sizeZIndex: React.PropTypes.number,
    drawerProps: React.PropTypes.object,
    handle: React.PropTypes.node,
    draggable: React.PropTypes.bool
  },

  mixins: [
    Scrollable
  ],

  scrollerProps: {
    bouncing: false,
    scrollingX: true,
    scrollingY: false,
    snapping: true
  },

  afterMeasureScroll(node) {
    this.scroller.setSnapSize(this.props.sideWidth, node.clientHeight);
    this.scroller.scrollTo(this.props.sideWidth, 0);
  },

  getDefaultProps() {
    return {
      sideWidth: 200,
      behavior: LeftNavBehavior.NORMAL
    };
  },

  componentDidUpdate(prevProps) {
    if (this.props.sideWidth !== prevProps.sideWidth)
      this._measureScroll();
  },

  closeSide() {
    if (this.isSideOpen())
      this.scroller.scrollTo(this.props.sideWidth, 0, true);
  },

  _handleTap() {
    var scrollTo = this.isSideOpen() ? this.props.sideWidth : 0;
    this.scroller.scrollTo(scrollTo, 0, true);
  },

  _handleContentTouchTap(e) {
    if (!this.isSideOpen()) return;
    this.scroller.scrollTo(this.props.sideWidth, 0, true);
    e.preventDefault();
  },

  isSideOpen() {
    return this.state.scrollX !== this.props.sideWidth;
  },

  _isAnimating() {
    return this.state.scrollX > 0 && this.state.scrollX < this.props.sideWidth;
  },

  render() {
    var {
      behavior,
      sideWidth,
      sideZIndex,
      handle,
      side,
      children,
      drawerProps,
      draggable,
      ...props } = this.props;

    var isSideOpen = this.isSideOpen();

    this.addStyles('side', isSideOpen && {
      left: sideWidth * -1,
      width: sideWidth,
      zIndex: sideZIndex || 0
    });

    var sideProps = {
      translate: behavior.parent.translate(sideWidth, this.state.scrollX),
      rotate: behavior.parent.rotate(sideWidth, this.state.scrollX),
      opacity: behavior.parent.opacity(sideWidth, this.state.scrollX),
      styles: isSideOpen ? { self: this.getStyles('side') } : null
    };

    var drawerProps = Object.assign({
      layer: 1,
      translate: DrawerBehavior.left.translate(this.state.scrollX),
      scroller: this.scroller,
      onTouchTap: this._handleContentTouchTap
    }, drawerProps);

    var movableHandle = clone(handle, {
      onTap: this._handleTap,
      isInTitleBar: true
    }, true);

    if (draggable)
      movableHandle = (
        <TouchableArea scroller={this.scroller} passprops>
          {movableHandle}
        </TouchableArea>
      );

    var childrenWithProps = clone(children, { handle: movableHandle });

    return (
      <div {...this.componentProps()} {...props}>
        {isSideOpen && (
          <AnimatableContainer {...sideProps}>
            <Tappable
              {...this.componentProps('sideInner')}
              onTap={this._handleContentTouchTap}>
              {side}
            </Tappable>
          </AnimatableContainer>
        )}
        <Drawer
          {...this.componentProps('drawer')}
          update={this.state.scrollX === 200}
          from="right"
          dragger={draggable}
          {...drawerProps}>
          {childrenWithProps}
        </Drawer>
      </div>
    );
  }
});