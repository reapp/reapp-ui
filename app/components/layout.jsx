var React = require('react');
var { Link } = require('react-router');
var Menu = require('./ui/components/Menu');
var Toolbar = require('./ui/components/Toolbar');
var Title = require('./ui/components/Title');
var Button = require('./ui/components/Button');
var LeftNavView = require('./ui/views/LeftNavView');
var DocumentTitle = require('react-document-title');

require('./Layout.css');

const TOOLBAR_HEIGHT = 44;
const SIDE_WIDTH = 200;

var Layout = React.createClass({
  button: <Button id="hamburger" type="menu" />,

  render() {
    var menu = (
      <Menu>
        <Link to="app">Home</Link>
        <Link to="viewer">3D Gallery</Link>
        <Link to="imageRoll">Image Roll</Link>
        <Link to="list">List</Link>
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