var React = require('react');
var ViewComponent = require('ui/viewcomponent');
var AnimatableContainer = require('../helpers/AnimatableContainer');
var LeftNavBehavior = require('./LeftNavBehavior');
var DrawerBehavior = require('./DrawerBehavior');
var TouchableArea = require('../helpers/TouchableArea');
var Drawer = require('./Drawer');
var { Scroller } = require('scroller');

module.exports = ViewComponent('LayoutLeftNav', {
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
    var { behavior, sideWidth, sideZIndex, handle, nav, children, ...props } = this.props;
    var isNavOpen = this.isNavOpen();

    this.addStyles('nav', isNavOpen && {
      left: sideWidth * -1,
      width: sideWidth,
      // zIndex: sideZIndex || 1
    });

    var navProps = {
      translate: behavior.parent.translate(sideWidth, this.state.scrollLeft),
      rotate: behavior.parent.rotate(sideWidth, this.state.scrollLeft),
      opacity: behavior.parent.opacity(sideWidth, this.state.scrollLeft),
      styles: isNavOpen ? this.getStyles('nav') : null
    };

    var drawerProps = {
      layer: 1,
      translate: DrawerBehavior.translate(this.state.scrollLeft),
      scroller: this.scroller,
      onTouchTap: this._handleContentTouchTap
    };

    return (
      <div {...this.componentProps()}>
        {isNavOpen && (
          <AnimatableContainer {...navProps}>
            <div {...this.componentProps('navInner')}
              onClick={this._handleContentTouchTap}>
              {nav}
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