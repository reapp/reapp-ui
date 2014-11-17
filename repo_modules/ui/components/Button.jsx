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
      this.addStyles('button', this.styles.borderless);

    iconProps.style = iconProps.style || {};
    iconProps.style.color = iconProps.style.color || this.getStyleVal('color');

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