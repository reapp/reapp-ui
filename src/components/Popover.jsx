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
    // element the popover is pointing towards
    target: React.PropTypes.object.isRequired,

    // show it as open
    open: React.PropTypes.bool,

    // pad in px towards edge of strings
    edgePadding: React.PropTypes.number,

    // size of arrow
    arrowSize: React.PropTypes.number,

    // after close event
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