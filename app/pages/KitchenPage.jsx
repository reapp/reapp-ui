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
            <Link to="popovers">Buttons &amp; Sliders</Link>
            <Link to="tabs">Tabs</Link>
            <Link to="modals">Modals</Link>
            <Link to="popovers">Popovers</Link>
            <Link to="listView">Lists</Link>
            <Link to="modals">Forms</Link>
            <Link to="modals">Grids</Link>
          </List>

          <ListTitle>Views</ListTitle>
          <List>
            <Link to="listView">View Lists</Link>
            <Link to="listView">Drawers &amp; Externals</Link>
            <Link to="tabs">Tabs</Link>
            <Link to="sidePanels">Side Panels</Link>
          </List>

          <ListTitle>Suites</ListTitle>
          <List>
            <Link to="tabs">Graphs</Link>
            <Link to="sidePanels">Maps</Link>
          </List>
        </ViewLeft>

        <ViewMain>
          {Handler && <div className="drawer-parent">{Handler}</div>}
        </ViewMain>
      </div>
    );
  }
});