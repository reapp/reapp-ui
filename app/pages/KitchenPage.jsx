var React = require('react/addons');
var { Link } = require('react-router');
var View = require('ui/views/View');
var ViewMain = require('ui/views/ViewMain');
var ViewLeft = require('ui/views/ViewLeft');
var List = require('ui/components/List');
var ListTitle = require('ui/components/ListTitle');
var TitleBar = require('ui/components/TitleBar');
var Transition = React.addons.CSSTransitionGroup;

var KitchenPage = React.createClass({
  title: 'Kitchen Sink',

  render() {
    var Handler = this.props.activeRouteHandler();
    if (Handler) Handler = <div className="drawer-parent">{Handler}</div>;

    return (
      <View id="KitchenSink">
        <ViewLeft id="kitchenSinkLeftView">
          <TitleBar>{this.title}</TitleBar>
          <ListTitle>Kitchen Sink</ListTitle>
          <List>
            <Link to="modals">Modals</Link>
            <Link to="popover">Popovers</Link>
            <Link to="tabs">Tabs</Link>
            <Link to="sidePanels">Side Panels</Link>
            <Link to="listView">List Views</Link>
          </List>
        </ViewLeft>

        <ViewMain>
          <Transition transitionName="drawer">
            {Handler}
          </Transition>
        </ViewMain>
      </View>
    );
  }
});

module.exports = KitchenPage;