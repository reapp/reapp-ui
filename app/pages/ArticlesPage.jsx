var React = require('react/addons');
var Immstruct = require('immstruct');
var ArticlePageComponent = require('../components/articles/ArticlePageComponent');
var { FluxMixin, GetStores } = require('../flux/bootstrap');

require('./ArticlesPage.styl');

var ArticlesPage = React.createClass({
  title: 'Article',

  mixins: [FluxMixin],

  statics: {
    getAsyncProps: () => GetStores(null, ['articles'])
  },

  render() {
    var structure = Immstruct({
      articles: this.props.articles,
      handler: this.props.activeRouteHandler || (() => <div></div>)
    });
    window.structure = structure;
    structure.on('next-animation-frame', this.forceUpdate);
    return ArticlePageComponent(structure.cursor());
  }
});

module.exports = ArticlesPage;