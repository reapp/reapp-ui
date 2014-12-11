var React = require('react/addons');
var Component = require('component');
var Transition = React.addons.TransitionGroup;
var { Link, RouteHandlerMixin, State } = require('react-router');
var ViewList = require('ui/views/ViewList');
var View = require('ui/views/View');
var SearchBar = require('ui/components/SearchBar');
var List = require('ui/components/List');
var Title = require('ui/components/Title');

var InertLink = React.createClass({
  displayName: 'Link',
  render() { return <Link {...this.props} activeClassName="" />; }
});

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
    return <InertLink to={link[0]}>{link[1]}</InertLink>;
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
        <View title={[this.props.handle, 'Kitchen Sink']}>
          <SearchBar onChange={this.handleSearch} defaultValue="" />

          <Title>Interface</Title>
          <List>
            {this.filteredLinks(interfaceLinks)}
          </List>

          <Title>Views</Title>
          <List>
            <InertLink to="view-lists">Parallax View List</InertLink>
            <InertLink to="dotted-view-list">Dotted View List</InertLink>
            <InertLink to="view-frosted">Frosted Glass Titlebar</InertLink>
            <InertLink to="panels">Drawers &amp; Panels</InertLink>
          </List>

          <Title>Suites</Title>
          <List>
            <InertLink to="modals">Graphs</InertLink>
            <InertLink to="modals">Maps</InertLink>
          </List>
        </View>

        {hasChild && this.getRouteHandler(this.props)}
      </ViewList>
    );
  }
});