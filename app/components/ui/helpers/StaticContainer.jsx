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

    return (numChildren > 1) ?
      <div>{this.props.children}</div> :
      this.props.children;
  }
});

module.exports = StaticContainer;