var React = require('react');
var Component = require('../component');
var Checkbox = require('../components/Checkbox');
var Radio = require('../components/Radio');
var Label = require('../components/Label');
var Icon = require('./Icon');
var Tappable = require('../mixins/Tappable');

module.exports = Component({
  name: 'Input',

  statics: {
    liNoPad: true
  },

  mixins: [
    Tappable
  ],

  getDefaultProps() {
    return {
      leftIconProps: null,
      rightIconProps: null,
      type: 'text',
      rightIconFunc: null
    };
  },

  _leftIconTap() {
    if (!!this.props.leftIconFunc) {
      this.props.leftIconFunc(this);
    }
  },

  _rightIconTap() {
    if (!!this.props.rightIconFunc) {
      this.props.rightIconFunc(this);
    }
  },

  render() {
    var { label, labelProps, ...props } = this.props;
    var element, elementProps = {};

    switch(this.props.type) {
      case 'checkbox':
        element = Checkbox;
        break;
      case 'radio':
        element = Radio;
        break;
      default:
        element = 'input';
        if (this.props.leftIconProps) {
          this.addStyles('input', 'leftPad');
        }
        if (this.props.rightIconProps) {
          this.addStyles('input', 'rightPad');
        }
        elementProps = this.componentProps('input');
    }

    var input = React.createElement(element,
      Object.assign({}, elementProps, props));

    if (!label) {
      return (
        <div {...this.componentProps('inputWrapper')}>
          {props.leftIconProps &&
            <div {...this.componentProps('leftIconWrapper')} onClick={this._leftIconTap}>
              <Icon {...props.leftIconProps} />
            </div>
          }
          {input}
          {props.rightIconProps &&
            <div {...this.componentProps('rightIconWrapper')} onClick={this._rightIconTap}>
              <Icon {...props.rightIconProps} />
            </div>
          }
        </div>
      );
    } else {
      return (
        <Label title={label} {...labelProps}>
          <div {...this.componentProps('inputWrapper')}>
            {input}
          </div>
        </Label>
      );
    }
  }
});
