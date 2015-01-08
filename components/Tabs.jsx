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
    var { children, type, ...props } = this.props;

    if (type)
      this.addStyles(this.styles[type]);

    return (
      <ul {...props} {...this.componentProps()}>
        {clone(children, (child, i) => ({ key: i, type }))}
      </ul>
    );
  }
});