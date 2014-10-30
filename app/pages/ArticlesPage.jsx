var React = require('react/addons');
var Immstruct = require('immstruct');
var Articles = require('../components/articles/Articles');
var { FluxMixin, GetStores } = require('brawndo');

var ArticlesPage = React.createClass({
  displayName: 'ArticlesPage',
  mixins: [FluxMixin],
  statics: {
    getAsyncProps: () => GetStores('articles')
  },

  getInitialState: () => ({ version: 0 }),

  componentWillReceiveProps(nextProps) {
    this.structure = this.makeStructure(nextProps);
    this.structure.on('next-animation-frame', () => {
      this.setState({ version: ++this.state.version });
    });
  },

  makeStructure(props) {
    return Immstruct({
      articles: props.articles,
      handler: props.activeRouteHandler,
      views: [
        {
          id: 'hot',
          title: 'Hot',
          content: null
        },
        {
          id: 'top',
          title: 'Top',
          content: null
        }
      ]
    });
  },

  render() {
    if (!this.structure) return <span />;
    return Articles('Articles', this.structure.cursor());
  }
});

module.exports = ArticlesPage;