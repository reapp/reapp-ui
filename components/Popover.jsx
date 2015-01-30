var React = require('react');
var Component = require('../component');
var PortalMixin = require('../mixins/PortalMixin');
var PopoverPortal = require('./PopoverPortal');

module.exports = Component({
  name: 'Popover',

  mixins: [
    PortalMixin(PopoverPortal)
  ],

  propTypes: {
    target: React.PropTypes.object,
    open: React.PropTypes.bool,
    edgePadding: React.PropTypes.number,
    arrowSize: React.PropTypes.number,
    handleClose: React.PropTypes.func,
    animationDuration: React.PropTypes.number,
    animations: React.PropTypes.object
  },

  getDefaultProps() {
    return {
      open: true,
      edgePadding: 3,
      arrowSize: 26,
      animationDuration: 200,
      animations: {
        popover: ['fade', 'scaleDown'],
        bg: 'fade'
      }
    };
  },

  render: () => null
});