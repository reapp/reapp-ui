var Component = require('ui/component');
var ViewListMixin = require('../mixins/ViewListMixin');

module.exports = Component({
  name: 'NestedViewList',

  mixins: [
    ViewListMixin
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
      animations: [
       { name: 'viewParallax', source: 'viewList' },
       { name: 'fadeOnEnter', source: 'viewList', target: 'overlay' }
      ],
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
    return this.renderViewList(
      Object.assign(
        this.componentProps(),
        this.props,
        this.state.step > 0 && { touchStartBoundsX: this.props.touchStartBoundsXFirstStep } || {}
      )
    );
  }
});