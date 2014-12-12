var React = require('react');
var Component = require('ui/component');
var Button = require('./Button');
var TweenState = require('react-tween-state');

module.exports = Component({
  name: 'Modal',

  mixins: [TweenState.Mixin],

  propTypes: {
    type: React.PropTypes.string
  },

  getDefaultProps() {
    return { type: 'alert' };
  },

  getInitialState() {
    return {
      open: this.props.open || false,
      step: 0,
      index: 1
    };
  },

  componentDidMount() {
    this.setState({ open: true });
    this.tweenState('step', {
      endValue: 1,
      duration: 400
    });
  },

  handleClose(e) {
    this.tweenState('step', {
      endValue: 0,
      duration: 400,
      onEnd: this.afterClose.bind(this, e)
    });
  },

  afterClose(e) {
    this.setState({ open: false });
    e.preventDefault();

    if (this.props.handleClose)
      this.props.handleClose(e);
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

    // todo modal animatinos
    // style={this.getAnimationStyles('FADE')}
    // style={this.getAnimationStyles('SCALE_DOWN')}
    return (
      <div {...this.componentProps()} {...props}
        onClick={this.handleClose}>
        <div {...this.componentProps('window')}>
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