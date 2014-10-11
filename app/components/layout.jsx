var React = require('react');
var { Link } = require('react-router');
var Menu = require('./ui/components/Menu');
var Toolbar = require('./ui/components/Toolbar');
var Title = require('./ui/components/Title');
var Button = require('./ui/components/Button');
var LeftNavView = require('./ui/views/LeftNavView');

require('./Layout.css');

const TOOLBAR_HEIGHT = 44;
const SIDE_WIDTH = 200;

var Layout = React.createClass({
  button: <Button type="menu" />,

  buttonStyle: {
    top: 0,
    left: 0,
    position: 'absolute',
    zIndex: 100
  },

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
      <LeftNavView
        ref="appLeftNavView"
        handle={this.button}
        handleStyle={this.buttonStyle}
        sideContent={menu}
        topHeight={TOOLBAR_HEIGHT}
        sideWidth={SIDE_WIDTH}>
        {this.props.children}
      </LeftNavView>
    );
  }
});

module.exports = Layout;