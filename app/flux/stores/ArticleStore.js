var Fluxxor = require('fluxxor');
var C = require('../constants');

var ArticleStore = Fluxxor.createStore({
  autoBind: ['data'],

  initialize() {
    this.loading = false;
    this.data = {};

    this.bindActions(
      C.LOAD_ARTICLES, this.onLoading,
      C.LOAD_ARTICLES_SUCCESS, this.onLoadingSuccess,
      C.LOAD_ARTICLES_FAIL, this.onLoadingFail
    );
  },

  onLoading() {
    this.loading = true;
    this.emit('change');
  },

  onLoadingSuccess(payload) {
    this.loading = false;
    this.error = null;

    this.data = payload.data.reduce((acc, item) => {
      var clientId = _.uniqueId();
      acc[clientId] = { id: clientId, data: item, status: 'OK' };
      return acc;
    }, {});

    this.emit('change');
  },

  onLoadingFail(payload) {
    this.loading = false;
    this.error = payload.error;
    this.emit('change');
  }
});

module.exports = ArticleStore;