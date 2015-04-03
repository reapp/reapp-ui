var React = require('react/addons');
var Component = require('../component');
var Icon = require('./Icon');
var clone = require('../lib/niceClone');
var Tappable = require('../mixins/Tappable');
var ButtonGroup = require('./ButtonGroup');

var Button = Component({
  name: 'Button',

  statics: {
    liNoPad: true
  },

  mixins: [
    React.addons.PureRenderMixin,
    Tappable
  ],

  propTypes: {
    iconProps: React.PropTypes.object,
    icon: React.PropTypes.element,
    chromeless: React.PropTypes.bool,
    fullscreen: React.PropTypes.bool,
    rounded: React.PropTypes.bool,
    active: React.PropTypes.bool,
    isInTitleBar: React.PropTypes.bool,
    isInViewList: React.PropTypes.bool,
    color: React.PropTypes.string,
    textColor: React.PropTypes.string,
    inactive: React.PropTypes.bool,
    alignLeft: React.PropTypes.bool
  },

  render() {
    var focused = this.state.tapActive;
    var {
      iconProps,
      color,
      textColor,
      icon,
      children,
      fullscreen,
      chromeless,
      rounded,
      active,
      inactive,
      isInTitleBar,
      isInViewList,
      animationSource,
      tapFocusStyle,
      alignLeft,
      ...props } = this.props;

    var cloneProps = Object.assign({}, iconProps || {}, {
      isInTitleBar,
      isInViewList,
      animationSource: animationSource || isInTitleBar && 'viewList',
      focused
    });

    if (color)
      this.addStyles({
        borderColor: color,
        background: color,
        color: '#fff'
      });

    if (textColor)
      this.addStyles({
        color: textColor
      });

    if (icon)
      icon = clone(icon, cloneProps, true);

    if (isInTitleBar)
      this.addStyles('isInTitleBar');

    if (chromeless)
      this.addStyles('chromeless');

    if (fullscreen)
      this.addStyles('fullscreen');

    if (rounded)
      this.addStyles('rounded');

    if (active)
      this.addStyles('active');

    if (inactive)
      this.addStyles('inactive');

    if (alignLeft)
      this.addStyles('inner', 'alignLeft');

    if (focused)
      if (active)
        this.addStyles('activeFocused');
      else
        this.addStyles(tapFocusStyle || isInTitleBar ? 'focusedTitleBar' : 'focused');

    var tapProps;
    if (this.props.onTap) {
      tapProps = this.tappableProps();
      this.addClass(tapProps.className);
    }

    return (
      <button {...tapProps} {...this.componentProps()} {...props}>
        {icon || !!iconProps && <Icon {...cloneProps} />}
        <div {...this.componentProps('inner')}>
          {children}
        </div>
      </button>
    );
  }
});

Button.Group = ButtonGroup;

module.exports = Button;