var React = require('react/addons');
var Transition = React.addons.TransitionGroup;
var { Link, RouteHandler } = require('react-router');
var ViewMain = require('ui/views/ViewMain');
var ViewLeft = require('ui/views/ViewLeft');
var Drawer = require('ui/views/Drawer');
var List = require('ui/components/List');
var Title = require('ui/components/Title');
var TitleBar = require('ui/components/TitleBar');

var KitchenPage = module.exports = React.createClass({
  title: 'Kitchen Sink',

  render() {
    return (
      <div id="KitchenSink">
        <ViewLeft id="kitchenSinkLeftView" title={this.title}>
          <Title>Interface</Title>
          <List>
            <Link to="controls">Controls</Link>
            <Link to="lists">Lists</Link>
            <Link to="modals">Modals</Link>
            <Link to="popovers">Popovers</Link>
            <Link to="forms">Forms</Link>
            <Link to="tabs">Tabs</Link>
            <Link to="grids">Grid</Link>
          </List>

          <Title>Views</Title>
          <List>
            <Link to="viewLists">Parallax View List</Link>
            <Link to="dottedViewList">Dotted View List</Link>
            <Link to="viewFrosted">Frosted Glass Titlebar</Link>
            <Link to="panels">Drawers &amp; Panels</Link>
          </List>

          <Title>Suites</Title>
          <List>
            <Link to="modals">Graphs</Link>
            <Link to="modals">Maps</Link>
          </List>
        </ViewLeft>

        <ViewMain>
          <RouteHandler {...this.props} />
        </ViewMain>
      </div>
    );
  }
});

// {Handler && <div className="drawer-parent">{Handler}</div>}