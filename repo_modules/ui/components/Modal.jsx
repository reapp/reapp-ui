var React = require('react');
var Component = require('ui/component');
var Button = require('./Button');

module.exports = Component('Modal', {
  propTypes: {
    type: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      type: 'alert'
    };
  },

  getInitialState() {
    return {
      open: this.props.open || true
    };
  },

  componentDidMount() {
    window.addEventListener(`modal-${this.props.id}`, e => {
      this.setState({ open: true });
    });
  },

  componentWillUnmount() {
    window.removeEventListener(`modal-${this.props.id}`);
  },

  handleClose(e) {
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

    return (
      <div {...props} {...this.componentProps()} onClick={this.handleClose}>
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