var React = require('react');
var { Link } = require('react-router');
var DocumentTitle = require('react-document-title');
var Menu = require('../ui/components/Menu');
var Toolbar = require('../ui/components/Toolbar');
var Title = require('../ui/components/Title');
var Button = require('../ui/components/Button');
var LeftNavView = require('../ui/views/LeftNavView');

var menu = (
  <Menu>
    <a href="app">Home</a>
    <a href="viewer">Gallery</a>
    <a href="list">List</a>
  </Menu>
);

var button = <Button type="menu" />;

var AppLayout = React.createClass({
  render() {
    var toolbar = (
      <Toolbar id="app-toolbar">
        <Title>
          {this.props.title}
        </Title>
      </Toolbar>
    );

    return (
      <DocumentTitle title={this.props.title}>
        <LeftNavView
          ref="appLeftNavView"
          button={button}
          topContent={toolbar}
          sideContent={menu}
          topHeight={51}
          sideWidth={200}>

          {this.props.children}
        </LeftNavView>
      </DocumentTitle>
    );
  }
});

module.exports = AppLayout;