var React = require('react');
var ReactStyle = require('react-style');
var { Link } = require('react-router');
var Toolbar = require('../ui/components/Toolbar');
var Menu = require('../ui/components/Menu');
var Icon = require('../ui/components/Icon');
var Title = require('../ui/components/Title');

require('./AppToolbar.css');

var AppToolbar = React.createClass({
  render() {
    return (
      <div>
        <Toolbar id="app-toolbar">
          <Title>
            {this.props.title}
          </Title>
          <Icon type="search" action="search" />
        </Toolbar>
        <Menu>
          <Link to="app">Home</Link>
          <Link to="viewer">Gallery</Link>
          <Link to="list">List</Link>
        </Menu>
      </div>
    );
  }
});

module.exports = AppToolbar;