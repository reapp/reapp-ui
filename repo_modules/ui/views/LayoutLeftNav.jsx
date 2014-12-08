var React = require('react');
var ViewComponent = require('ui/viewcomponent');
var AnimatableContainer = require('../helpers/AnimatableContainer');
var LeftNavBehavior = require('./LeftNavBehavior');
var DrawerBehavior = require('./DrawerBehavior');
var TouchableArea = require('../helpers/TouchableArea');
var Drawer = require('./Drawer');
var { Scroller } = require('scroller');

module.exports = ViewComponent('LayoutLeftNav', {
  getDefaultProps() {
    return {
      sideWidth: 200,
      behavior: LeftNavBehavior.ALL_PARALLAX_FADE
    };
  },

  setModal(modal) {
    this.setState({ modal });
  },

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

  closeSide() {
    if (this.isSideOpen())
      this.scroller.scrollTo(this.props.sideWidth, 0, true);
  },

  _handleScroll(left) {
    this.setState({scrollLeft: left});
  },

  getInitialState() {
    return {scrollLeft: 0};
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
    return this.state.scrollLeft !== this.props.sideWidth;
  },

  render() {
    var { behavior, sideWidth, sideZIndex, handle, side, children, ...props } = this.props;
    var isSideOpen = this.isSideOpen();

    this.addStyles('side', isSideOpen && {
      left: sideWidth * -1,
      width: sideWidth,
      zIndex: sideZIndex || 0
    });

    var sideProps = {
      translate: behavior.parent.translate(sideWidth, this.state.scrollLeft),
      rotate: behavior.parent.rotate(sideWidth, this.state.scrollLeft),
      opacity: behavior.parent.opacity(sideWidth, this.state.scrollLeft),
      styles: isSideOpen ? this.getStyles('side') : null
    };

    var drawerProps = {
      layer: 1,
      translate: DrawerBehavior.translate(this.state.scrollLeft),
      scroller: this.scroller,
      onTouchTap: this._handleContentTouchTap
    };

    return (
      <div {...this.componentProps()}>
        {isSideOpen && (
          <AnimatableContainer {...sideProps}>
            <div {...this.componentProps('sideInner')}
              onClick={this._handleContentTouchTap}>
              {side}
            </div>
          </AnimatableContainer>
        )}
        <Drawer {...this.componentProps('drawer')} {...drawerProps}>
          {children}
          <TouchableArea onClick={this._handleTap} scroller={this.scroller}>
            {handle}
          </TouchableArea>
        </Drawer>
      </div>
    );
  }
});