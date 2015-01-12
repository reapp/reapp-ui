var React = require('react');
var Component = require('../component');
var Icon = require('./Icon');
var clone = require('../lib/niceClone');

module.exports = Component({
  name: 'Button',

  propTypes: {
    iconProps: React.PropTypes.object,
    icon: React.PropTypes.element,
    chromeless: React.PropTypes.bool,
    rounded: React.PropTypes.bool,
    active: React.PropTypes.bool
  },

  render() {
    var { iconProps, icon, children, chromeless, rounded, active, isInTitleBar, ...props } = this.props;

    console.log(this.props.styles);

    if (isInTitleBar)
      this.addStyles('isInTitleBar');

    // pass isInTitleBar down to icon
    if (isInTitleBar && iconProps)
      iconProps.isInTitleBar = true;

    if (icon && iconProps)
      icon = clone(icon, iconProps, true);

    if (chromeless)
      this.addStyles(this.styles.chromeless);

    if (rounded)
      this.addStyles(this.styles.rounded);

    if (active)
      this.addStyles(this.styles.active);

    return (
      <button {...this.componentProps()} {...props}>
        {icon || !!iconProps && <Icon {...iconProps} />}
        {children && (
          <span style={{ margin: 'auto' }}>
            {children}
          </span>
        )}
      </button>
    );
  }
});