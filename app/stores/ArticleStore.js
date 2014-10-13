var Fluxxor = require('fluxxor');
var C = require('./Constants');

var ArticleStore = Fluxxor.createStore({
  autoBind: ['articles'],

  initialize() {
    this.loading = true;
    this.articles = {};

    this.bindActions(
      C.LOAD_ARTICLES, this.onLoadArticles,
      C.LOAD_ARTICLES_SUCCESS, this.onLoadArticlesSuccess,
      C.LOAD_ARTICLES_FAIL, this.onLoadArticlesFail
    );
  },

  onLoadArticles() {
    this.loading = true;
    this.emit('change');
  },

  onLoadArticlesSuccess(payload) {
    this.loading = false;
    this.error = null;

    this.articles = payload.articles.reduce((acc, article) => {
      var clientId = _.uniqueId();
      acc[clientId] = { id: clientId, article: article, status: 'OK' };
      return acc;
    }, {});

    this.emit('change');
  },

  onLoadArticlesFail(payload) {
    this.loading = false;
    this.error = payload.error;
    this.emit('change');
  }
});

module.exports = ArticleStore;