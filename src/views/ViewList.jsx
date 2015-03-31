var React = require('react');
var Component = require('../component');
var ViewListMixin = require('./ViewListMixin');

module.exports = Component({
  name: 'ViewList',

  mixins: [
    ViewListMixin
  ],

  getInitialState() {
    return this.getViewListInitialState();
  },

  render() {
    return this.getViewList(this.props.behavior);
  }
});