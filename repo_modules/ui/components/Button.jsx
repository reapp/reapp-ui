var Component = require('ui/component');
var Icon = require('./Icon');

module.exports = Component('Button', {
  getDefaultProps() {
    return { type: 'std' };
  },

  render() {
    var { transforms, iconProps, children, type, borderless, rounded, active, ...props } = this.props;
    var hasIconProps = !!iconProps;

    if (borderless)
      this.addStyles(this.styles.borderless);

    if (rounded)
      this.addStyles(this.styles.rounded);

    if (active)
      this.addStyles(this.styles.active);

    iconProps = iconProps || {};
    iconProps.color = iconProps.color || this.getStyleVal('color');

    this.addClass(`button-${type}`);

    return (
      <button {...props} {...this.componentProps()}>
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