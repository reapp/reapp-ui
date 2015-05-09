var React = require('react');
var Animate = require('react-animate-state');
var Tappable = require('../helpers/Tappable');
var Component = require('../component');
var ModalButton = require('./ModalButton');
var ButtonGroup = require('./ButtonGroup');
var clone = require('../lib/niceClone');

module.exports = Component({
  name: 'ModalPortal',

  mixins: [
    Animate
  ],

  getInitialState() {
    return {
      step: 0,
      index: 1,
      isClosing: false
    };
  },

  componentDidMount() {
    this.animate({ step: 1 }, this.props.animationDuration);
  },

  handleCancel() {
    if (this.props.onCancel)
      this.props.onCancel();

    this.handleClose();
  },

  handleConfirm(e) {
    if (this.props.onConfirm)
      this.props.onConfirm();

    this.handleClose(e);
  },

  handleBgClose() {
    if (this.props.bgTapClose)
      this.handleClose()
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
          <ModalButton confirm onTap={this.handleConfirm} stopPropagation>OK</ModalButton>
        ];
        break;
      case 'confirm':
        buttons = [
          <ModalButton styles={{ self: { borderLeft: 'none' } }} onTap={this.handleCancel} stopPropagation>Cancel</ModalButton>,
          <ModalButton confirm onTap={this.handleConfirm} stopPropagation>OK</ModalButton>
        ];
        break;
      case 'custom':
        buttons = [];
        break;
    }

    var buttonWidth = (100 / buttons.length) + '%';
    var style = {
      flexBasis: buttonWidth,
      WebkitFlexBasis: buttonWidth,
      maxWidth: buttonWidth
    };

    return (
      <div {...this.componentProps()} {...props}>
        <Tappable
          {...this.componentProps('bg')}
          onTap={this.handleBgClose}
          stopPropagation
        />
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
            {clone(buttons, (props, index) => {
              return { index, style };
            }, true)}
          </div>
        </div>
      </div>
    );
  }
});