var React = require('react');
var Component = require('../component');
var Animated = require('../mixins/Animated');
var ModalPortal = require('./ModalPortal');

module.exports = Component({
  name: 'Modal',

  propTypes: {
    type: React.PropTypes.string,
    animationDuration: React.PropTypes.number,
    animations: React.PropTypes.object,
    handleConfirm: React.PropTypes.func,
    handleCancel: React.PropTypes.func,
    handleClose: React.PropTypes.func
  },

  getDefaultProps() {
    return {
      type: 'alert',
      animationDuration: 200,
      animations: {
        modal: ['fade', 'scaleDown'],
        bg: 'fade'
      }
    };
  },

  componentDidMount() {
    this.node = document.createElement('div');
    this.node.className = 'ModalPortal';
    document.body.appendChild(this.node);
    this.renderModal(this.props);
  },

  componentWillReceiveProps(nextProps) {
    this.renderModal(nextProps);
  },

  componentWillUnmount() {
    React.unmountComponentAtNode(this.node);
    document.body.removeChild(this.node);
  },

  handleClose() {
    if (this.props.onClose)
      this.props.onClose();
  },

  renderModal(props) {
    React.render(
      <ModalPortal {...props} onClose={this.handleClose} />,
      this.node
    );
  },

  render: () => null
});