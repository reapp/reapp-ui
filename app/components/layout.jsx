var React = require('react');
var { AutoLayout } = require('react-gss');

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