var Component = require('ui/component');
var Icon = require('./Icon');

module.exports = Component('Button', {
  render() {
    var { transforms, iconProps, children, borderless, rounded, active, ...props } = this.props;
    var hasIconProps = !!iconProps;

    if (hasIconProps)
      iconProps.color = iconProps.color || this.getStyleVal('color');

    if (borderless)
      this.addStyles(this.styles.borderless);

    if (rounded)
      this.addStyles(this.styles.rounded);

    if (active)
      this.addStyles(this.styles.active);

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