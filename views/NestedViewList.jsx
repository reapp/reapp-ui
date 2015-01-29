var React = require('react');
var Component = require('../component');
var ViewListMixin = require('../mixins/ViewListMixin');
var Animator = require('../mixins/Animator');

module.exports = Component({
  name: 'NestedViewList',

  mixins: [
    ViewListMixin,
    Animator('viewList')
  ],

  getInitialState() {
    return this.getViewListInitialState();
  },

  getDefaultProps() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      resizeWithWindow: true,
      scrollToStep: 0,
      titleBarProps: {},
      scrollerProps: {
        animationDuration: 400,
        paging: true,
        bouncing: false,
        scrollingY: false
      },
      viewAnimations: {
        inner: 'viewParallax',
        overlay: 'fadeOnEnter'
      },
      // touchable only on the left and right edges
      touchStartBoundsX: [
        { from: 0, to: 20 },
        { from: window.innerWidth - 20, to: window.innerWidth }
      ],
      // only touchable on right edge at first step
      touchStartBoundsXFirstStep: {
        from: window.innerWidth - 20,
        to: window.innerWidth
      }
    };
  },

  render() {
    var extraProps = {};

    // only enable right side touching if on first view
    if (this.state.step === 0)
      extraProps.touchStartBoundsX = this.props.touchStartBoundsXFirstStep;

    if (this.state.step > 0)
      this.addStyles('isNested');

    // disable touch events if only one view
    if (this.state.children && this.state.children.length === 1)
      extraProps.untouchable = true;

    return (
      <div {...this.componentProps()} {...this.props}>
        {this.getViewList(extraProps)}
      </div>
    );
  }
});