var React = require('react');
var { Link } = require('react-router');
var DocumentTitle = require('react-document-title');
var Menu = require('../ui/components/Menu');
var Toolbar = require('../ui/components/Toolbar');
var Title = require('../ui/components/Title');
var Button = require('../ui/components/Button');
var LeftNavView = require('../ui/views/LeftNavView');

var button = <Button type="menu" />;
const TOOLBAR_HEIGHT = 44;

var AppLayout = React.createClass({
  render() {
    var toolbar = (
      <Toolbar id="app-toolbar" height={TOOLBAR_HEIGHT}>
        <Title>
          {this.props.title}
        </Title>
      </Toolbar>
    );

    var menu = (
      <Menu>
        <Link to="app">Home</Link>
        <Link to="viewer">Gallery</Link>
        <Link to="list">List</Link>
      </Menu>
    );

    return (
      <DocumentTitle title={this.props.title}>
        <LeftNavView
          ref="appLeftNavView"
          button={button}
          topContent={toolbar}
          sideContent={menu}
          topHeight={TOOLBAR_HEIGHT}
          sideWidth={200}>

          {this.props.children}
        </LeftNavView>
      </DocumentTitle>
    );
  }
});

module.exports = AppLayout;