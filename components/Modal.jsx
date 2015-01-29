var React = require('react');
var TweenState = require('react-tween-state');
var Component = require('../component');
var Animated = require('../mixins/Animated');
var ModalPortal = require('./ModalPortal');

module.exports = Component({
  name: 'Modal',

  mixins: [
    TweenState.Mixin
  ],

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

    // animate open
    // this.tweenState('step', {
    //   endValue: 1,
    //   duration: this.props.animationDuration
    // });
  },

  componentWillReceiveProps(nextProps) {
    this.renderModal(nextProps);
  },

  componentWillUnmount() {
    React.unmountComponentAtNode(this.node);
    document.body.removeChild(this.node);
  },

  renderModal(props) {
    React.render(
      <ModalPortal
        {...props}
        step={1}
        index={1} />,
      this.node
    );
  },

  render: () => null
});