var React = require('react');

var StaticContainer = React.createClass({
  getDefaultProps() {
    return { shouldUpdate: false };
  },

  shouldComponentUpdate(nextProps) {
    return nextProps.shouldUpdate ||
      (this.props.staticKey !== nextProps.staticKey);
  },

  render() {
    return this.props.children;
  }
});

module.exports = StaticContainer;