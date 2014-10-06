var React = require('react');
var { AutoLayout } = require('react-gss');

require('./Layout.css');

var Layout = React.createClass({
  render() {
    return (
      <AutoLayout
        top="window.top"
        bottom="window.bottom"
        left="window.left"
        right="window.right">

        {this.props.children}

      </AutoLayout>
    );
  }
});

module.exports = Layout;