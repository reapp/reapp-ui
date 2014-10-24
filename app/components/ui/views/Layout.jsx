var React = require('react');

var Layout = React.createClass({
  render() {
    return this.props.children;
  }
});

module.exports = Layout;