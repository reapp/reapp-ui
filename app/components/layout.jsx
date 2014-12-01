var React = require('react');
var { Link, RouteHandler } = require('react-router');
var Layered = require('ui/mixins/Layered');
var Menu = require('ui/components/Menu');
var Button = require('ui/components/Button');
var LayoutLeftNav = require('ui/views/LayoutLeftNav');
var DocumentTitle = require('react-document-title');

require('./Layout.css');

var TOOLBAR_HEIGHT = 44;
var SIDE_WIDTH = 200;

var Layout = React.createClass({
  mixins: [Layered],

  render() {
    var button = (
      <Button
        id="hamburger"
        iconProps={{
          stroke: 1,
          size: 26,
          type: 'hamburger'
        }}
        style={{
          position: 'absolute',
          top: 2,
          left: 0,
          zIndex: this.getZIndexForNextLayer() - 1
        }}
        borderless />
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
      <LayoutLeftNav
        handle={button}
        nav={menu}
        topHeight={TOOLBAR_HEIGHT}
        sideWidth={SIDE_WIDTH}>
        <DocumentTitle title="React Base" />
        <RouteHandler {...this.props} />
      </LayoutLeftNav>
    );
  }
});

module.exports = Layout;