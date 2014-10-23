var React = require('react/addons');
var Immstruct = require('immstruct');
var Articles = require('../components/articles/Articles');
var { FluxMixin, GetStores } = require('../flux/bootstrap');

var ArticlesPage = React.createClass({
  displayName: 'ArticlesPage',
  mixins: [FluxMixin],
  statics: {
    getAsyncProps: () => GetStores(null, ['articles'])
  },

  render() {
    var structure = Immstruct({
      articles: this.props.articles,
      handler: this.props.activeRouteHandler
    });

    return Articles('ASP', structure.cursor());
  }
});

module.exports = ArticlesPage;