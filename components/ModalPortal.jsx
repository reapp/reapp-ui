var React = require('react');
var TweenState = require('react-tween-state');
var Component = require('../component');
var ModalButton = require('./ModalButton');
var ButtonGroup = require('./ButtonGroup');

module.exports = Component({
  name: 'ModalPortal',

  mixins: [
    TweenState.Mixin
  ],

  propTypes: {
    open: React.PropTypes.bool,
    type: React.PropTypes.string,
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

  getInitialState() {
    return {
      step: 0,
      index: 1,
      isClosing: false
    };
  },

  componentDidMount() {
    // animate open
    this.tweenState('step', {
      endValue: 1,
      duration: this.props.animationDuration
    });
  },

  handleCancel() {
    if (this.props.onCancel)
      this.props.onCancel();

    this.handleClose();
  },

  handleConfirm() {
    if (this.props.onConfirm)
      this.props.onConfirm();

    this.handleClose();
  },

  handleClose(e) {
    this.afterClose(e);
    // todo: this broke with portals
    // if (!this.state.isClosing) {
    //   this.setState({ isClosing: true });
    //   this.tweenState('step', {
    //     endValue: 2,
    //     duration: this.props.animationDuration,
    //     onEnd: this.afterClose.bind(this, e)
    //   });
    // }
  },

  afterClose(e) {
    setTimeout(() => {
      if (this.props.onClose)
        this.props.onClose(e);
    });
  },

  render() {
    var {
      modalProps,
      title,
      type,
      children,
      open,
      ...props } = this.props;

    if (open) {
      this.addClass('open');
      this.addStyles('open');
    }

    if (modalProps)
      this.addStyles('modal', modalProps.styles);

    var buttons;
    switch (type) {
      case 'alert':
        buttons = [
          <ModalButton confirm onClick={this.handleConfirm}>OK</ModalButton>
        ];
        break;
      case 'prompt':
      case 'confirm':
        buttons = [
          <ModalButton onClick={this.handleCancel}>Cancel</ModalButton>,
          <ModalButton confirm onClick={this.handleConfirm}>OK</ModalButton>
        ];
        break;
    }

    return (
      <div {...this.componentProps()} {...props}>
        <div {...this.componentProps('bg')}
          onClick={this.handleClose}/>
        <div {...this.componentProps('modal')}>
          <div {...this.componentProps('inner')}>
            {title &&
              <div {...this.componentProps('title')}>
                {title}
              </div>
            }
            <div {...this.componentProps('text')}>
              {children}
            </div>
          </div>
          <div {...this.componentProps('buttons')}>
            <ButtonGroup>
              {buttons}
            </ButtonGroup>
          </div>
        </div>
      </div>
    );
  }
});