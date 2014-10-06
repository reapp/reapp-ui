var React = require('react');

require('./Layout.css');

var Layout = React.createClass({
  render() {
    return (
      <div id="layout">
        {this.props.children}
      </div>
    );
  }
});

module.exports = Layout;