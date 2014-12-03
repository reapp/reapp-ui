var React = require('react/addons');
var Transition = React.addons.TransitionGroup;
var { Link, RouteHandler, State } = require('react-router');
var ParallaxViewList = require('ui/views/ParallaxViewList');
var View = require('ui/views/View');
var Drawer = require('ui/views/Drawer');
var List = require('ui/components/List');
var Title = require('ui/components/Title');
var TitleBar = require('ui/components/TitleBar');

module.exports = React.createClass({
  mixins: [State],

  render() {
    var numRoutes = this.getRoutes().length;
    var hasChild = numRoutes > 2;

    return (
      <ParallaxViewList initialStep={numRoutes - 2}>
        <View title="Kitchen Sink">
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
        </View>

        {hasChild && <RouteHandler {...this.props} />}
      </ParallaxViewList>
    );
  }
});

// {Handler && <div className="drawer-parent">{Handler}</div>}