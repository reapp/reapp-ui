var React = require('react');
var ReactStyle = require('react-style');
var Toolbar = require('../ui/components/Toolbar');
var Menu = require('../ui/components/Menu');
var { Link } = require('react-router');

require('./AppToolbar.css');

var AppToolbar = React.createClass({
  render() {
    return (
      <Toolbar id="app-toolbar">
        <Menu>
          <Link to="app">Home</Link>
          <Link to="viewer">Gallery</Link>
          <Link to="list">List</Link>
        </Menu>
      </Toolbar>
    );
  }
});

module.exports = AppToolbar;