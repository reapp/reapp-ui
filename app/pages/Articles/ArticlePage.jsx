var { State } = require('react-router');
var ArticlesStore = require('stores/ArticlesStore');
var Actions = require('actions/Actions');
var Article = require('components/articles/Article');
var View = require('ui/views/View');

var ArticlePage = module.exports = React.createClass({
  mixins: [State],

  statics: {
    fetchData(params) {
      return new Promise((res, rej) => {
        var unlisten = ArticlesStore.listen(data => {
          var article = data.get(params.id);
          if (article && article.get('status') === 'LOADED') {
            unlisten();
            res(article);
          }
        });
        Actions.loadArticle(params.id);
      });
    }
  },

  render() {
    var cursor = ArticlesStore().get(this.getParams().id);
    console.log('articlpage', this.props);
    return cursor ?
      <Article {...this.props} cursor={cursor} /> :
      <View />;
  }
});