var React = require('react');
var ReactDescriptor = require('react/lib/ReactDescriptor');

var StaticContainer = React.createClass({
  getDefaultProps() {
    return { shouldUpdate: false };
  },

  shouldComponentUpdate(nextProps) {
    return nextProps.shouldUpdate ||
      (this.props.staticKey !== nextProps.staticKey);
  },

  render() {
    return <div>{this.props.children}</div>;
  }
});

module.exports = StaticContainer;