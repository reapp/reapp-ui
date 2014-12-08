var React = require('react');
var StaticView = require('ui/helpers/StaticView');
var Modal = require('ui/components/Modal');
var ModalMixin = require('ui/mixins/ModalMixin');
var Button = require('ui/components/Button');
var BackButton = require('ui/components/buttons/BackButton');
var { Container, Block } = require('ui/components/Grid');

module.exports = StaticView({
  statics: {
    title: [<BackButton />, 'Modals']
  },

  contextTypes: {
    setModal: React.PropTypes.func.isRequired
  },

  showModal(modal) {
    var setModal = this.context.setModal;
    if (setModal) setModal(modal);
  },

  getInitialState() {
    return { modal: null };
  },

  toggleAlert() {
    this.setState({modal: this.state.modal === 'alert' ? null : 'alert'});
  },

  handlePrompt() {
    this.setState({modal: 'prompt'});
  },

  handleConfirm() {
    this.setState({modal: 'confirm'});
  },

  render() {
    var modal;

    switch(this.state.modal) {
      case 'alert':
        modal = <Modal title="React" onAccept={this.toggleAlert}>Hello</Modal>;
        break;
    }

    if (modal)
      this.showModal(modal);

    return (
      <div>
        <Container>
          <p>These are replicas of the native Alert, Prompt and Confirm modals.</p>
        </Container>
        <Container>
          <Button onClick={this.toggleAlert}>Alert</Button>
          <Button onClick={this.handlePrompt}>Prompt</Button>
          <Button onClick={this.handleConfirm}>Confirm</Button>
        </Container>
      </div>
    );
  }
});