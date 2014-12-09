var Component = require('ui/component');
var Icon = require('./Icon');

module.exports = Component('Button', {
  render() {
    var { iconProps, icon, children, borderless, rounded, active, ...props } = this.props;

    if (icon) {
      iconProps = (iconProps || {});
      iconProps.type = icon;
    }

    if (iconProps)
      iconProps.color = iconProps.color || this.getStyleVal('color');

    if (borderless)
      this.addStyles(this.styles.borderless);

    if (rounded)
      this.addStyles(this.styles.rounded);

    if (active)
      this.addStyles(this.styles.active);

    return (
      <button {...props} {...this.componentProps()}>
        {!!iconProps && <Icon {...iconProps} />}
        {children && (
          <span style={{ margin: 'auto' }}>
            {children}
          </span>
        )}
      </button>
    );
  }
});