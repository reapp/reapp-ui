var React = require('react');
var Component = require('../component');
var Icon = require('./Icon');
var clone = require('../lib/niceClone');
var Tappable = require('../mixins/Tappable');
var ButtonGroup = require('./ButtonGroup');
var TouchRipple = require('../helpers/ripple/TouchRipple');
import ReactTransitionGroup from 'react-addons-transition-group';

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
    
    var rippleStyle = 'rippleDark';

    if (color) {
      this.addStyles({
        borderColor: color,
        background: color,
        color: '#fff'
      });
      var rippleStyle = 'rippleLight';
    }

    if (textColor)
      this.addStyles({
        color: textColor
      });

    if (icon)
      icon = clone(icon, cloneProps, true);

    if (isInTitleBar) {
      this.addStyles('isInTitleBar');
      this.addStyles('text', 'titleBarText');
    }

    if (chromeless)
      this.addStyles('chromeless');

    if (fullscreen)
      this.addStyles('fullscreen');

    if (rounded)
      this.addStyles('rounded');

    if (filled) {
      this.addStyles('filled');
      var rippleStyle = 'rippleLight';
    }

    if (inactive)
      this.addStyles('inactive');

    if (tapActive)
      if (filled && !chromeless) {
        this.addStyles('tapActiveFilled');
        console.log('add tapActiveFilled')
      } else {
        console.log('add tapActive or tapActiveTitleBar')
        this.addStyles(isInTitleBar ? 'tapActiveTitleBar' : 'tapActive');
        if (chromeless) {
          this.addStyles('tapActiveChromeless');
        }
      }

    var tapProps;
    tapProps = this.tappableProps();
    this.addClass(tapProps.className);


    //if (chromeless)
    //  this.addStyles('chromeless');

    //if (this.state.tapActive) {
    //  this.addClass('tapActive');
    //} else {
    //  this.addClass('tapInactive');
    //}

    this.addStyles('ripple', rippleStyle);

    return (
      <div {...this.componentProps()} {...props}>
        <TouchRipple
          rippleStyle={this.componentProps('ripple').style}
          style={this.componentProps('rippleGroup').style}
          centerRipple={false}
        >
          <div {...this.componentProps('inner')} {...tapProps}>
            {icon || !!iconProps && <Icon {...cloneProps} />}
            <div {...this.componentProps('text')}>{children}</div>
          </div>
        </TouchRipple>
      </div>
    );
  }
});

Button.Group = ButtonGroup;

module.exports = Button;
