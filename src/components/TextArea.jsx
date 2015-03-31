var React = require('react');
var Component = require('../component');
var Label = require('../components/Label');

module.exports = Component({
  name: 'Textarea',

  statics: {
    liNoPad: true
  },

  render() {
    var { label, labelProps, ...props } = this.props;

    var textarea = (
      <textarea {...props} {...this.componentProps()} />
    );

    if (!label)
      return textarea;

    return (
      <Label title={label} {...labelProps}>
        {textarea}
      </Label>
    );
  }
});
