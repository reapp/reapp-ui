var React = require('react');
var Styled = require('ui/styled');
var Icon = require('./Icon');

require('./Button.styl');

var Button = React.createClass({
  mixins: [Styled('button')],

  getDefaultProps() {
    return { iconProps: {} };
  },

  render() {
    var { transforms, iconProps, borderless, children, type, ...props } = this.props;

    borderless &&
      this.assignStyles('button', this.styles.borderless);

    iconProps.styles = iconProps.styles || {};
    iconProps.styles.color = iconProps.styles.color || this.styles.button.color;

    return (
      <button {...props}
        styles={this.getStyles()}
        className={`button-${type}`}>
        {iconProps && <Icon {...iconProps} />}
        {children && (
          <span style={{ margin: 'auto' }} data-transform={transforms}>
            {children}
          </span>
        )}
      </button>
    );
  }
});

module.exports = Button;