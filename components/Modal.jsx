var React = require('react');
var Component = require('../component');
var ModalPortal = require('./ModalPortal');
var PortalMixin = require('../mixins/PortalMixin');

module.exports = Component({
  name: 'Modal',

  mixins: [
    PortalMixin(ModalPortal)
  ],

  render: () => null
});