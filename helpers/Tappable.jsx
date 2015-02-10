var React = require('react');
var Tappable = require('../mixins/Tappable');
var clone = require('../lib/niceClone');

module.exports = React.createClass({
  mixins: [
    Tappable
  ],

  getDefaultProps() {
    return {
      element: 'div'
    };
  },

  render() {
    var { element, children, passprops, ...props } = this.props;

    // add tappable props
    props = Object.assign({}, this.tappableProps(), props);

    // pass props to children
    if (passprops)
      children = clone(children, props, true);

    return React.createElement(element, props, children);
  }
})