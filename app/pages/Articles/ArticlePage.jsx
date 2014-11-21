var { State } = require('react-router');
var ArticlesStore = require('stores/ArticlesStore');
var Actions = require('actions/Actions');
var Article = require('components/articles/Article');

var ArticlePage = module.exports = React.createClass({
  mixins: [State],

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
    console.log(this.getParams())
    var cursor = ArticlesStore().get(this.getParams().id);
    return cursor ? Article(`Article-${cursor.get('id')}`, cursor) : <div />;
  }
});