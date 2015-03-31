var React = require('react');
var Component = require('../component');
var Checkbox = require('../components/Checkbox');
var Radio = require('../components/Radio');
var Label = require('../components/Label');

module.exports = Component({
  name: 'Input',

  statics: {
    liNoPad: true
  },

  getDefaultProps() {
    return {
      type: 'text'
    };
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
        elementProps = this.componentProps('input');
    }

    var input = React.createElement(element,
      Object.assign({}, elementProps, props));

    if (!label)
      return input;

    return (
      <Label title={label} {...labelProps}>
        {input}
      </Label>
    );
  }
});
