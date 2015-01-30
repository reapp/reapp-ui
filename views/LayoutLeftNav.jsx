var React = require('react/addons');
var Component = require('../component');
var AnimatableContainer = require('../helpers/AnimatableContainer');
var LeftNavBehavior = require('../behaviors/LeftNavBehavior');
var Drawer = require('../components/Drawer');
var DrawerBehavior = require('../behaviors/DrawerBehavior');
var TouchableArea = require('../helpers/TouchableArea');
var Scrollable = require('../mixins/Scrollable');
var clone = require('../lib/niceClone');

module.exports = Component({
  name: 'LayoutLeftNav',

  mixins: [Scrollable({
    scrollBounce: false,
    scrollX: true,
    scrollY: false,
    scrollSnap: true
  })],

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
      styles: isSideOpen ? this.getStyles('side') : null
    };

    var drawerProps = {
      layer: 1,
      translate: DrawerBehavior.right.translate(this.state.scrollX),
      scroller: this.scroller,
      onTouchTap: this._handleContentTouchTap
    };

    var touchableHandle = (
      <TouchableArea onClick={this._handleTap} scroller={this.scroller} passprops>
        {handle}
      </TouchableArea>
    );

    return (
      <div {...this.componentProps()} {...props}>
        {isSideOpen && (
          <AnimatableContainer {...sideProps}>
            <div {...this.componentProps('sideInner')}
              onClick={this._handleContentTouchTap}>
              {side}
            </div>
          </AnimatableContainer>
        )}
        <Drawer {...this.componentProps('drawer')} {...drawerProps} dragger={false}>
          {clone(children, { handle: touchableHandle })}
        </Drawer>
      </div>
    );
  }
});