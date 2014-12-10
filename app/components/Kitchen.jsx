var React = require('react/addons');
var Component = require('component');
var Transition = React.addons.TransitionGroup;
var { Link, RouteHandlerMixin, State } = require('react-router');
var ViewList = require('ui/views/ViewList');
var View = require('ui/views/View');
var SearchBar = require('ui/components/SearchBar');
var List = require('ui/components/List');
var Title = require('ui/components/Title');

module.exports = React.createClass({
  mixins: [State, RouteHandlerMixin],

  getInitialState() {
    return { searchVal: '' };
  },

  handleSearch(e) {
    this.setState({ searchVal: e.target.value });
  },

  filteredLinks(links) {
    var search = RegExp(this.state.searchVal, 'i');
    var filteredLinks = links.filter(link => !!link[1].match(search));
    return filteredLinks.map(this.makeLink);
  },

  makeLink(link) {
    return <Link to={link[0]}>{link[1]}</Link>;
  },

  render() {
    var numRoutes = this.getRoutes().length;
    var hasChild = numRoutes > 2;
    var interfaceLinks = [
      ['controls', 'Controls'],
      ['lists', 'Lists'],
      ['modals', 'Modals'],
      ['popovers', 'Popovers'],
      ['cards', 'Cards'],
      ['forms', 'Forms'],
      ['tabs', 'Tabs'],
      ['grids', 'Grid']
    ];

    return (
      <ViewList scrollToStep={numRoutes - 2}>
        <View title={[this.props.menuButton, 'Kitchen Sink']}>
          <SearchBar onChange={this.handleSearch} defaultValue="" />

          <Title>Interface</Title>
          <List>
            {this.filteredLinks(interfaceLinks)}
          </List>

          <Title>Views</Title>
          <List>
            <Link to="view-lists">Parallax View List</Link>
            <Link to="dotted-view-list">Dotted View List</Link>
            <Link to="view-frosted">Frosted Glass Titlebar</Link>
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