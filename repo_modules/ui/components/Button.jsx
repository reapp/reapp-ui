var React = require('react');
var Styled = require('ui/styled');
var Icon = require('./Icon');

var Button = React.createClass({
  mixins: [Styled('button')],

  getDefaultProps() {
    return {
      type: 'std'
    };
  },

  render() {
    var { transforms, iconProps, borderless, children, type, ...props } = this.props;
    var hasIconProps = !!iconProps;

    if (borderless)
      this.addStyles(this.styles.borderless);

    iconProps = iconProps || {};
    iconProps.style = iconProps.style || {};
    iconProps.style.color = iconProps.style.color || this.getStyleVal('color');

    return (
      <button {...props}
        styles={this.getStyles()}
        className={`button-${type}`}>
        {hasIconProps && <Icon {...iconProps} />}
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