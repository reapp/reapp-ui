var React = require('react');
var Component = require('ui/component');
var Animated = require('ui/mixins/Animated');
var Button = require('./Button');
var TweenState = require('react-tween-state');

module.exports = Component({
  name: 'Modal',

  mixins: [
    Animated,
    TweenState.Mixin
  ],

  propTypes: {
    type: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      type: 'alert',
      animationDuration: 300,
      animations: [
        { animation: 'fade', name: 'bg' },
        { animation: 'scaleDown', name: 'window' },
        { animation: 'fade', name: 'window' }
      ]
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
    this.tweenState('step', {
      endValue: 1,
      duration: this.props.animationDuration
    });
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
    }, 5);
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
          <Button borderless>OK</Button>
        ];
        break;
      case 'prompt':
      case 'confirm':
        buttons = [];
        break;
    }

    return (
      <div {...this.componentProps()} {...props}>
        <div {...this.componentProps('bg')}
          onClick={this.handleClose}
          style={this.getAnimation('bg')} />
        <div {...this.componentProps('window')}
          style={this.getAnimation('window')}>
          <div {...this.componentProps('inner')}>
            {title && (
              <div {...this.componentProps('title')}>
                {title}
              </div>
            )}
            {children}
          </div>
          {buttons}
        </div>
      </div>
    );
  }
});