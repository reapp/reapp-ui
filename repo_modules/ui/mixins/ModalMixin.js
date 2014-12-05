var React = require('react');

module.exports = {
  contextTypes: {
    setModal: React.PropTypes.func.isRequired
  },

  showModal(modal) {
    var setModal = this.context.setModal;
    if (setModal) setModal(modal);
  }
};