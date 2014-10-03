var React = require('react');
var ReactStyle = require('react-style');
var Toolbar = require('../../ui/toolbar');
var Menu = require('../../ui/menu');
var { Link } = require('react-router');

require('./app_toolbar.css');

var AppToolbar = React.createClass({
  render() {
    return (
      <Toolbar id="app-toolbar">
        <Menu>
          <Link to="app">Home</Link>
          <Link to="viewer">Gallery</Link>
          <Link to="viewerRebound">List</Link>
        </Menu>
      </Toolbar>
    );
  }
});

module.exports = AppToolbar;