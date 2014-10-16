var Fluxxor = require('fluxxor');

var ArticlesStore = Fluxxor.createStore({
  initialize() {
    this.loading = false;
    this.data = {};

    this.bindActions(
      'LOAD_ARTICLES', this.onLoading,
      'LOAD_ARTICLES_SUCCESS', this.onLoadingSuccess,
      'LOAD_ARTICLES_FAIL', this.onLoadingFail
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

module.exports = ArticlesStore;