var React = require('react');
var AppToolbar = require('./layout/AppToolbar');

require('./Layout.css');

var Layout = React.createClass({
  render() {
    return (
      <div id='layout'>
        <AppToolbar />
        {this.props.children}
      </div>
    );
  }
});

module.exports = Layout;