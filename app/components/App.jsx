var React = require('react');
var { Link, RouteHandler } = require('react-router');
var Menu = require('ui/components/Menu');
var Button = require('ui/components/Button');
var LayoutLeftNav = require('ui/views/LayoutLeftNav');
var DocumentTitle = require('react-document-title');

require('./App.css');

module.exports = React.createClass({
  render() {
    var button = (
      <Button
        id="hamburger"
        iconProps={{
          stroke: 1,
          size: 26,
          type: 'hamburger',
          shapeRendering: 'crispEdges'
        }}
        borderless />
    );

    var menu = (
      <Menu>
        <Link to="app">Home</Link>
        <Link to="kitchen">Kitchen Sink</Link>
        <Link to="viewer">3D Gallery</Link>
      </Menu>
    );

    return (
      <LayoutLeftNav
        handle={button}
        side={menu}>
        <DocumentTitle title="React Base" />
        <RouteHandler {...this.props} menuButton={button} />
      </LayoutLeftNav>
    );
  }
});