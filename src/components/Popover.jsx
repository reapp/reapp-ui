var React = require('react');
var Component = require('../component');
var PortalMixin = require('../mixins/PortalMixin');
var PopoverPortal = require('./PopoverPortal');

var Popover = Component({
  name: 'Popover',

  // See PopoverPortal for implementation
  mixins: [
    PortalMixin(PopoverPortal)
  ],

  propTypes: {
    target: React.PropTypes.object.isRequired,
    open: React.PropTypes.bool,
    edgePadding: React.PropTypes.number,
    arrowSize: React.PropTypes.number,
    onClose: React.PropTypes.func,
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

module.exports = Popover;