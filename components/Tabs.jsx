var React = require('react/addons');
var Component = require('../component');
var clone = require('../lib/niceClone');

module.exports = Component({
  name: 'Tabs',

  getDefaultProps() {
    return {
      type: 'text'
    };
  },

  render() {
    var { children, type, active, ...props } = this.props;

    if (type)
      this.addStyles(this.styles[type]);

    return (
      <ul {...this.componentProps()} {...props}>
        {clone(children, (child, i) => ({
          type,
          active: i === active,
          key: i,
        }))}
      </ul>
    );
  }
});