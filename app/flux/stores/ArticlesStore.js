var Fluxxor = require('fluxxor');
var _ = require('lodash-node');

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

    this.data = payload.reduce((acc, item) => {
      var clientId = _.uniqueId();
      item.touches = 0;
      acc[clientId] = { id: clientId, data: item, status: 'OK' };
      return acc;
    }, {});

    this.emit('change');
  },

  onLoadingFail(payload) {
    this.loading = false;
    this.error = payload.error;
    this.emit('change');
  },

  get(id) {
    return this.data[id].data;
  }
});

module.exports = ArticlesStore;