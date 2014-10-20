var React = require('react/addons');
var Immstruct = require('immstruct');
var Articles = require('../components/articles/Articles');
var { FluxMixin, GetStores } = require('../flux/bootstrap');

var ArticlesPage = React.createClass({
  mixins: [FluxMixin],

  getInitialState() {
    return { activePage: 0 };
  },

  componentWillReceiveProps(nextProps) {
    console.log('nextProps', nextProps);
  },

  statics: {
    getAsyncProps: (params) => GetStores(null, ['articles'])
  },

  render() {
    console.log('articlesPage render');
    var structure = Immstruct({
      articles: this.props.articles,
      handlerId: '' + this.state.activePage++,
      handler: this.props.activeRouteHandler
    });
    window.structure = structure;
    structure.on('next-animation-frame', this.forceUpdate);
    return Articles(structure.cursor());
  }
});

module.exports = ArticlesPage;