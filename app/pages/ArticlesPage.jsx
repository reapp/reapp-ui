var React = require('react/addons');
var Immstruct = require('immstruct');
var Articles = require('../components/articles/Articles');
var { FluxMixin, GetStores } = require('../flux/bootstrap');

var ArticlesPage = React.createClass({
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
    return Articles(structure.cursor());
  }
});

module.exports = ArticlesPage;