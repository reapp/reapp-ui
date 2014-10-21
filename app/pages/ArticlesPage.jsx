var React = require('react/addons');
var Immstruct = require('immstruct');
var Articles = require('../components/articles/Articles');
var { FluxMixin, GetStores } = require('../flux/bootstrap');

var ArticlesPage = React.createClass({
  mixins: [FluxMixin],

  // shouldComponentUpdate(nextProps) {
  //   return !!nextProps.articles;
  // },

  statics: {
    getAsyncProps: () => GetStores(null, ['articles'])
  },

  render() {
    var structure = Immstruct({
      articles: this.props.articles,
      handler: this.props.activeRouteHandler
    });

    structure.on('next-animation-frame', this.forceUpdate);
    return Articles(structure.cursor());
  }
});

module.exports = ArticlesPage;