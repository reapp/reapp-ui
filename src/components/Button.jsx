import React from 'react/addons';
import { Surface, Text } from 'react-canvas';
import Component from '../component';
import Icon from './Icon';
import clone from '../lib/niceClone';
import Tappable from '../mixins/Tappable';
var ButtonGroup = require('./ButtonGroup');

var Button = Component({
  name: 'Button',

  statics: {
    liNoPad: true
  },

  mixins: [
    React.addons.PureRenderMixin
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
      animationSource: animationSource || isInTitleBar && 'viewList'
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

    return (
      <Surface top={0} left={0} width={200} height={200}>
        <Text>
          {children}
        </Text>
      </Surface>
    );
  }
});

Button.Group = ButtonGroup;

module.exports = Button;