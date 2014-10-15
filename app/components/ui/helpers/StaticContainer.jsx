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
    var numChildren = React.Children.count(this.props.children);

    if (numChildren > 1)
      return <div>{this.props.children}</div>;
    else
      return this.props.children;
  }
});

module.exports = StaticContainer;