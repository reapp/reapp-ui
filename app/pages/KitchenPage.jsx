var React = require('react/addons');
var Transition = React.addons.TransitionGroup;
var { Link, RouteHandler, State } = require('react-router');
var ViewMain = require('ui/views/ViewMain');
var ViewLeft = require('ui/views/ViewLeft');
var List = require('ui/components/List');
var ListTitle = require('ui/components/ListTitle');
var TitleBar = require('ui/components/TitleBar');

var KitchenPage = module.exports = React.createClass({
  title: 'Kitchen Sink',

  mixins: [ State ],

  render() {
    var name = this.getRoutes().reverse()[0].name;
    var hasChild = name !== 'kitchen';

    return (
      <div id="KitchenSink">
        <ViewLeft id="kitchenSinkLeftView" title={this.title}>
          <ListTitle>Interface</ListTitle>
          <List>
            <Link to="controls">Controls</Link>
            <Link to="lists">Lists</Link>
            <Link to="modals">Modals</Link>
            <Link to="popovers">Popovers</Link>
            <Link to="forms">Forms</Link>
            <Link to="grids">Grids</Link>
          </List>

          <ListTitle>Views</ListTitle>
          <List>
            <Link to="viewLists">Parallax View List</Link>
            <Link to="dottedViewList">Dotted View List</Link>
            <Link to="viewFrosted">Frosted Glass Titlebar</Link>
            <Link to="panels">Drawers &amp; Panels</Link>
            <Link to="tabs">Tabs</Link>
          </List>

          <ListTitle>Suites</ListTitle>
          <List>
            <Link to="modals">Graphs</Link>
            <Link to="modals">Maps</Link>
          </List>
        </ViewLeft>

        <Transition component="div">
          {hasChild ? <RouteHandler {...this.props} key={name} /> : null}
        </Transition>
      </div>
    );
  }
});

// {Handler && <div className="drawer-parent">{Handler}</div>}