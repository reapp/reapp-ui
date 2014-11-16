var React = require('react');
var { Link, ActiveRouteHandler } = require('react-router');
var Menu = require('ui/components/Menu');
var Title = require('ui/components/Title');
var Button = require('ui/components/Button');
var LeftNavView = require('ui/views/LeftNavView');
var DocumentTitle = require('react-document-title');

require('./Layout.css');

var TOOLBAR_HEIGHT = 44;
var SIDE_WIDTH = 200;

var Layout = React.createClass({
  styles: {
    button: {
      position: 'absolute',
      zIndex: 1001,
      top: 0,
      left: 8
    }
  },

  render() {
    var button = (
      <Button
        id="hamburger"
        iconProps={{
          stroke: 1,
          size: 26,
          type: 'hamburger'
        }}
        style={this.styles.button} />
    );

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
          handle={button}
          sideContent={menu}
          topHeight={TOOLBAR_HEIGHT}
          sideWidth={SIDE_WIDTH}>
          <ActiveRouteHandler {...this.props} />
        </LeftNavView>
      </DocumentTitle>
    );
  }
});

module.exports = Layout;