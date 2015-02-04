var React = require('react');
var Component = require('../component');
var PortalMixin = require('../mixins/PortalMixin');
var PopoverPortal = require('./PopoverPortal');

module.exports = Component({
  name: 'Popover',

  mixins: [
    PortalMixin(PopoverPortal)
  ],

  render: () => null
});