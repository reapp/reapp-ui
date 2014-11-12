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
    return <div>{this.props.children}</div>;
  }
});

module.exports = StaticContainer;