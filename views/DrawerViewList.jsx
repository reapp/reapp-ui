var React = require('react');
var Component = require('../component');
var ViewListMixin = require('../mixins/ViewListMixin');
var DrawerViewListBehavior = require('../behaviors/DrawerViewListBehavior');

module.exports = Component({
  name: 'DrawerViewList',

  mixins: [
    ViewListMixin
  ],

  getInitialState() {
    return this.getViewListInitialState();
  },

  getDefaultProps() {
    return DrawerViewListBehavior;
  },

  render() {
    return (
      <div>
        {this.getViewList()}
      </div>
    );
  }
});