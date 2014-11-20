var ArticlesStore = require('stores/ArticlesStore');
var Actions = require('actions/Actions');
var Article = require('components/articles/Article');
var ImmutableProps = require('mixins/ImmutableProps');

var ArticlePage = module.exports = React.createClass({
  mixins: [ImmutableProps(['data.article'])],

  statics: {
    fetchData(params) {
      return new Promise((res, rej) => {
        var dataListener = data => {
          var article = data.get(params.id);
          if (article.get('status') === 'LOADED') {
            res(article);
            ArticlesStore.unlisten(dataListener);
          }
        };

        ArticlesStore.listen(dataListener);
        Actions.loadArticle(params.id);
      });
    }
  },

  render() {
    var cursor = this.props.data.get('article');
    return Article(`Article-${cursor.get('id')}`, cursor);
  }
});