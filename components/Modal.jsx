var React = require('react');
var Component = require('../component');
var ModalPortal = require('./ModalPortal');
var PortalMixin = require('../mixins/PortalMixin');
var ModalButton = require('./ModalButton');

var Modal = Component({
  name: 'Modal',

  // See ModalPortal for implementation
  mixins: [
    PortalMixin(ModalPortal)
  ],

  propTypes: {
    open: React.PropTypes.bool,
    type: React.PropTypes.oneOf([
      'alert', // OK
      'confirm' // Cancel | OK
    ]),
    animationDuration: React.PropTypes.number,
    animations: React.PropTypes.object,
    onConfirm: React.PropTypes.func,
    onCancel: React.PropTypes.func,
    onClose: React.PropTypes.func
  },

  getDefaultProps() {
    return {
      open: true,
      type: 'alert',
      onClose: this.handleClose,
      animationDuration: 200,
      animations: {
        modal: ['fade', 'scaleDown'],
        bg: 'fade'
      }
    };
  },

  render: () => null
});

Modal.Button = ModalButton;

module.exports = Modal;