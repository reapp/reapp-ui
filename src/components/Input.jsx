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
      rightIconFunc: function() {},
      leftIconFunc: function() {},
      onBlur: function() {}
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

  _onBlur() {
    if (!!this.props.onBlur) {
      this.props.onBlur(this);
    }
  },

  render() {
    var { label, labelProps, onBlur, ...props } = this.props;
    var element, elementProps = {};

    var input = null;
    switch(this.props.type) {
      case 'checkbox':
        input = <Checkbox {...Object.assign({}, elementProps, props)} />;
        break;
      case 'radio':
        input = <Radio {...Oject.assign({}, elementProps, props)} />;
        break;
      default:
        if (this.props.leftIconProps) {
          this.addStyles('input', 'leftPad');
        }
        if (this.props.rightIconProps) {
          this.addStyles('input', 'rightPad');
        }
        elementProps = this.componentProps('input');
        input = <input {...Object.assign({}, elementProps, props)} onBlur={this._onBlur} />;
    }

    if (!label) {
      return (
        <div {...this.componentProps('inputWrapper')}>
          {props.leftIconProps &&
            <div {...this.componentProps('leftIconWrapper')} onMouseDown={this._leftIconTap}>
              <Icon {...props.leftIconProps} />
            </div>
          }
          {input}
          {props.rightIconProps &&
            <div {...this.componentProps('rightIconWrapper')} onMouseDown={this._rightIconTap}>
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
