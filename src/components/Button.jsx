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
    Tappable
  ],

  shouldComponentUpdate() {
    return !this.props.isInViewList || this.context.animations.viewList.stepper.value % 1 === 0;
  },

  propTypes: {
    // pass properties to Icon
    iconProps: React.PropTypes.object,

    // SVG icon
    icon: React.PropTypes.element,

    // no visual chrome added
    chromeless: React.PropTypes.bool,

    // Extend to fit screen when inside View
    fullscreen: React.PropTypes.bool,

    // Fully rounded corners
    rounded: React.PropTypes.bool,

    // Filled type button (no borders)
    filled: React.PropTypes.bool,

    // Color of button
    color: React.PropTypes.string,

    // Text color
    textColor: React.PropTypes.string,

    // Disabled look / no tap
    inactive: React.PropTypes.bool,

    // Props used for special display
    isInTitleBar: React.PropTypes.bool,
    isInViewList: React.PropTypes.bool,
  },

  render() {
    var tapActive = this.state.tapActive;
    var {
      iconProps,
      color,
      textColor,
      icon,
      children,
      fullscreen,
      chromeless,
      rounded,
      filled,
      inactive,
      isInTitleBar,
      isInViewList,
      animationSource,
      ...props } = this.props;

    var cloneProps = Object.assign({}, iconProps || {}, {
      isInTitleBar,
      isInViewList,
      animationSource: animationSource || isInTitleBar && 'viewList',
      tapActive
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

    if (filled)
      this.addStyles('filled');

    if (inactive)
      this.addStyles('inactive');

    if (tapActive)
      if (filled)
        this.addStyles('tapActiveFilled');
      else
        this.addStyles(isInTitleBar ? 'tapActiveTitleBar' : 'tapActive');

    var tapProps;
    if (this.props.onTap) {
      tapProps = this.tappableProps();
      this.addClass(tapProps.className);
    }

    return (
      <div {...tapProps} {...this.componentProps()} {...props}>
        {icon || !!iconProps && <Icon {...cloneProps} />}
        <div {...this.componentProps('inner')}>
          {children}
        </div>
      </div>
    );
  }
});

Button.Group = ButtonGroup;

module.exports = Button;
