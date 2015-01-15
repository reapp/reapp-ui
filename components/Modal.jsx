var React = require('react');
var TweenState = require('react-tween-state');
var Component = require('../component');
var Animated = require('../mixins/Animated');
var Button = require('./Button');

var ModalButton = React.createClass({
  render() {
    return <Button chromeless {...this.props} />;
  }
});

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

  getInitialState() {
    return {
      open: this.props.open || false,
      step: 0,
      index: 1,
      isClosing: false
    };
  },

  componentDidMount() {
    this.setState({ open: true });

    // animate open
    this.tweenState('step', {
      endValue: 1,
      duration: this.props.animationDuration
    });
  },

  handleCancel() {
    if (this.props.handleCancel)
      this.props.handleCancel();

    this.handleClose();
  },

  handleConfirm() {
    if (this.props.handleConfirm)
      this.props.handleConfirm();

    this.handleClose();
  },

  handleClose(e) {
    if (!this.state.isClosing) {
      this.setState({ isClosing: true });
      this.tweenState('step', {
        endValue: 2,
        duration: this.props.animationDuration,
        onEnd: this.afterClose.bind(this, e)
      });
    }
  },

  afterClose(e) {
    setTimeout(() => {
      if (this.props.handleClose)
        this.props.handleClose(e);
    });
  },

  render() {
    var { modalProps, title, type, children, ...props } = this.props;

    if (this.state.open) {
      this.addClass('open');
      this.addStyles(this.styles.open);
    }

    if (modalProps)
      this.addStyles('modal', modalProps.styles);

    var buttons;
    switch (type) {
      case 'alert':
        buttons = [
          <ModalButton onClick={this.handleConfirm}>OK</ModalButton>
        ];
        break;
      case 'prompt':
      case 'confirm':
        var halfButton = { width: '50%' };
        var borderedButton = {
          borderLeft: `1px solid ${this.getConstant('midGray')}`
        };

        buttons = [
          <ModalButton styles={{ self: halfButton }} onClick={this.handleCancel}>Cancel</ModalButton>,
          <ModalButton styles={{ self: Object.assign({}, halfButton, borderedButton)  }} onClick={this.handleConfirm}>OK</ModalButton>
        ];
        break;
    }

    return (
      <div {...this.componentProps()} {...props}>
        <div {...this.componentProps('bg')}
          onClick={this.handleClose}/>
        <div {...this.componentProps('modal')}>
          <div {...this.componentProps('inner')}>
            {title && (
              <div {...this.componentProps('title')}>
                {title}
              </div>
            )}
            {children}
          </div>
          <div {...this.componentProps('buttons')}>
            {buttons}
          </div>
        </div>
      </div>
    );
  }
});