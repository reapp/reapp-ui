var React = require('react/addons');
var Component = require('../component');
var Icon = require('./Icon');
var clone = require('../lib/niceClone');

module.exports = Component({
  name: 'Button',

  mixins: [React.addons.PureRenderMixin],

  propTypes: {
    iconProps: React.PropTypes.object,
    icon: React.PropTypes.element,
    chromeless: React.PropTypes.bool,
    rounded: React.PropTypes.bool,
    active: React.PropTypes.bool
  },

  render() {
    var {
      iconProps,
      icon,
      children,
      chromeless,
      rounded,
      active,
      isInTitleBar,
      animationState,
      ...props } = this.props;

    if (isInTitleBar)
      this.addStyles('isInTitleBar');

    // pass isInTitleBar down to icon
    if (isInTitleBar && iconProps)
      iconProps.isInTitleBar = true;

    if (icon && iconProps)
      icon = clone(icon, iconProps, true);

    if (iconProps)
      iconProps = Object.assign({}, iconProps, { animationState })

    if (chromeless)
      this.addStyles('chromeless');

    if (rounded)
      this.addStyles('rounded');

    if (active)
      this.addStyles('active');

    return (
      <button {...this.componentProps()} {...props}>
        {icon || !!iconProps && <Icon {...iconProps} />}
        {children && (
          <span {...this.componentProps('inner')}>
            {children}
          </span>
        )}
      </button>
    );
  }
});