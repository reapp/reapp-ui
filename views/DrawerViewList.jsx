var React = require('react');
var Component = require('../component');
var ViewListMixin = require('../mixins/ViewListMixin');

module.exports = Component({
  name: 'DrawerViewList',

  mixins: [
    ViewListMixin
  ],

  getInitialState() {
    return this.getViewListInitialState();
  },

  getDefaultProps() {
    return {
      vertical: true,
      width: window.innerWidth,
      height: window.innerHeight,
      resizeWithWindow: true,
      scrollToStep: 0,
      scrollerProps: {
        scrollingY: true,
        scrollingX: false,
        animationDuration: 500,
        paging: true,
        bouncing: false,
        easing: 'cubic'
      },
      viewAnimations: {
        self: 'viewDrawer'
      }
    };
  },

  render() {
    return (
      <div>
        {this.getViewList()}
      </div>
    );
  }
});