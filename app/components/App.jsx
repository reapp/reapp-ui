var React = require('react');
var Component = require('component');
var { Link, RouteHandler } = require('react-router');
var DocumentTitle = require('react-document-title');
var Menu = require('ui/components/Menu');
var Button = require('ui/components/Button');
var LayoutLeftNav = require('ui/views/LayoutLeftNav');
var PopoverHandler = require('ui/mixins/PopoverHandler');
var Popover = require('ui/components/Popover');
var ModalHandler = require('ui/mixins/ModalHandler');
var Modal = require('ui/components/Modal');
var { Scroller } = require('scroller');

require('./App.css');

module.exports = React.createClass({
  mixins: [PopoverHandler, ModalHandler],

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
      <LayoutLeftNav side={menu} handle={button}>
        <DocumentTitle title="React Base" />
        <RouteHandler {...this.props} menuButton={button} />

        {this.state.popoverProps && (
          <Popover {...this.state.popoverProps} />
        )}

        {this.state.modalProps && (
          <Modal {...this.state.modalProps} />
        )}
      </LayoutLeftNav>
    );
  }
});