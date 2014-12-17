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
    var { label, ...props } = this.props;
    var element;

    switch(this.props.type) {
      case 'checkbox':
        element = Checkbox;
        break;
      case 'radio':
        element = Radio;
        break;
      default:
        element = 'input';
    }

    var input = React.createElement(element, this.props);

    if (!label)
      return input;

    return (
      <Label title={label} {...props}>
        {input}
      </Label>
    );
  }
});
