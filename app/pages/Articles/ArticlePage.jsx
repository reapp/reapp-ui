var React = require('react');
var Immstruct = require('immstruct');
var ArticleComponent = require('../../components/articles/Article');
var { GetStores } = require('flux/bootstrap');

var ArticlePage = React.createClass({
  displayName: 'ArticlePage',

  statics: {
    getAsyncProps: (params) => GetStores(params, ['article'])
  },

  getInitialState: () => ({ version: 0 }),

  componentWillReceiveProps(nextProps) {
    if (nextProps.article) {
      this.structure = Immstruct({ article: nextProps.article[0].data });
      this.structure.on('next-animation-frame', () => {
        this.setState({ version: ++this.state.version });
      });
    }
  },

  render() {
    if (!this.structure) return <span />;
    var cursor = this.structure.cursor();
    return ArticleComponent(`Article-${cursor.get('article', 'id')}`, cursor);
  }
});

module.exports = ArticlePage;