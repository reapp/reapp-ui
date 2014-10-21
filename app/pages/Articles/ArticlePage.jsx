var React = require('react');
var Immstruct = require('immstruct');
var ArticleComponent = require('../../components/articles/Article');
var { GetStores } = require('../../flux/bootstrap');

var Article = React.createClass({
  statics: {
    getAsyncProps: (params) => GetStores(params, ['article'])
  },

  shouldComponentUpdate(nextProps) {
    return nextProps.article && nextProps.article[0];
  },

  render() {
    if (!this.props.article) return <span />;

    var article = this.props.article[0];
    var structure = Immstruct({
      article: article.data
    });

    // structure.on('next-animation-frame', this.forceUpdate);
    return ArticleComponent(`ArticlePage-${article.id}`, structure.cursor());
  }
});

module.exports = Article;