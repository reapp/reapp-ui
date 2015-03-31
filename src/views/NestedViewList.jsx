var React = require('react');
var Component = require('../component');
var ViewListMixin = require('./ViewListMixin');
var NestedViewListBehavior = require('../behaviors/NestedViewListBehavior');

module.exports = Component({
  name: 'NestedViewList',

  mixins: [
    ViewListMixin
  ],

  getDefaultProps: function() {
    return NestedViewListBehavior;
  },

  getInitialState: function() {
    return this.getViewListInitialState();
  },

  render() {
    var touchableProps = {};

    // only enable right side touching if on first view
    if (this.state.step === 0)
      touchableProps.touchStartBoundsX = this.props.touchStartBoundsXFirstStep;

    // disable touch events if only one view
    if (this.state.children && this.state.children.length === 1)
      touchableProps.untouchable = true;

    return this.getViewList({ touchableProps });
  }
});