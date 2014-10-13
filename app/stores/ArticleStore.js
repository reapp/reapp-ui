var Fluxxor = require('fluxxor');
var C = require('./Constants');

var ArticleStore = Fluxxor.createStore({
  autoBind: ['data'],

  initialize() {
    this.loading = false;
    this.data = {};

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

    this.data = payload.data.reduce((acc, article) => {
      var clientId = _.uniqueId();
      acc[clientId] = { id: clientId, data: article, status: 'OK' };
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