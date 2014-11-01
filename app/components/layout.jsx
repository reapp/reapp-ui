var React = require('react');
var { Link } = require('react-router');
var Menu = require('ui/components/Menu');
var Title = require('ui/components/Title');
var Button = require('ui/components/Button');
var LeftNavView = require('ui/views/LeftNavView');
var DocumentTitle = require('react-document-title');

require('./Layout.css');

var TOOLBAR_HEIGHT = 44;
var SIDE_WIDTH = 200;

var Layout = React.createClass({
  // this is a mess, button / draggableview
  button: <Button id="hamburger" type="menu-hamburger" style={{
    position: 'absolute',
    zIndex: 1001,
    top: -3,
    left: 8
  }} />,

  render() {
    var menu = (
      <Menu>
        <Link to="app">Home</Link>
        <Link to="kitchen">Kitchen Sink</Link>
        <Link to="viewer">3D Gallery</Link>
        <Link to="imageRoll">Image Roll</Link>
      </Menu>
    );

    return (
      <DocumentTitle title="React Base">
        <LeftNavView
          ref="appLeftNavView"
          handle={this.button}
          sideContent={menu}
          topHeight={TOOLBAR_HEIGHT}
          sideWidth={SIDE_WIDTH}>
          {this.props.children}
        </LeftNavView>
      </DocumentTitle>
    );
  }
});

module.exports = Layout;