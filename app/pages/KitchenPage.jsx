var React = require('react');
var { Link } = require('react-router');
var ViewMain = require('ui/views/ViewMain');
var ViewLeft = require('ui/views/ViewLeft');
var List = require('ui/components/List');
var ListTitle = require('ui/components/ListTitle');
var TitleBar = require('ui/components/TitleBar');

var KitchenPage = module.exports = React.createClass({
  title: 'Kitchen Sink',

  render() {
    var Handler = this.props.activeRouteHandler();

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
            <Link to="viewLists">View Lists</Link>
            <Link to="modals">Drawers &amp; Panels</Link>
            <Link to="modals">Tabs</Link>
          </List>

          <ListTitle>Suites</ListTitle>
          <List>
            <Link to="modals">Graphs</Link>
            <Link to="modals">Maps</Link>
          </List>
        </ViewLeft>

        <ViewMain>
          {Handler && <div className="drawer-parent">{Handler}</div>}
        </ViewMain>
      </div>
    );
  }
});