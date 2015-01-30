var React = require('react');
var Component = require('../component');
var ModalPortal = require('./ModalPortal');
var PortalMixin = require('../mixins/PortalMixin');

module.exports = Component({
  name: 'Modal',

  mixins: [
    PortalMixin(ModalPortal)
  ],

  propTypes: {
    open: React.PropTypes.bool,
    type: React.PropTypes.string,
    animationDuration: React.PropTypes.number,
    animations: React.PropTypes.object,
    handleConfirm: React.PropTypes.func,
    handleCancel: React.PropTypes.func,
    handleClose: React.PropTypes.func
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

  handleClose() {
    if (this.props.onClose)
      this.props.onClose();
  },

  render: () => null
});