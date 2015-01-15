var React = require('react/addons');
var Component = require('../component');
var clone = require('../lib/niceClone');

module.exports = Component({
  name: 'Bar',

  getDefaultProps() {
    return {
      type: 'text'
    };
  },

  render() {
    var {
      children,
      type,
      active,
      position,
      ...props } = this.props;

    if (position)
      this.addStyles(`position-${position}`);

    if (type)
      this.addStyles(type);

    return (
      <ul {...this.componentProps()} {...props}>
        {clone(children, (child, i) => ({
          type,
          active: i === active,
          key: i
        }))}
      </ul>
    );
  }
});