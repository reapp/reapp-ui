var React = require('react/addons');
var Transition = React.addons.TransitionGroup;
var { Link, RouteHandlerMixin, State } = require('react-router');
var ViewList = require('ui/views/ViewList');
var View = require('ui/views/View');
var List = require('ui/components/List');
var Title = require('ui/components/Title');

module.exports = React.createClass({
  mixins: [State, RouteHandlerMixin],

  render() {
    var numRoutes = this.getRoutes().length;
    var hasChild = numRoutes > 2;

    return (
      <ViewList initialStep={numRoutes - 2}>
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

        {hasChild && this.getRouteHandler(this.props)}
      </ViewList>
    );
  }
});