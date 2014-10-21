var React = require('react');
var Immstruct = require('immstruct');
var ArticleComponent = require('../../components/articles/Article');
var { GetStores } = require('../../flux/bootstrap');
var _ = require('lodash-node');

var ArticlePage = React.createClass({
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
    var article = window.articleCursor = this.structure.cursor().get('article');
    return ArticleComponent(`AP-${article.get('id')}-${this.state.version}`, article);
  }
});

module.exports = ArticlePage;