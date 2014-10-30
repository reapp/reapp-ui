var Store = require('./Store');
var _ = require('lodash-node');

class ListStore extends Store  {
  constructor(name, actions) {
    var listStoreActions = {};
    listStoreActions[`LOAD_${name}_SUCCESS`] = this.onLoadingSuccess;
    listStoreActions[`LOAD_${name}_FAIL`] = this.onLoadingFail;
    super(name, _.merge(listStoreActions, actions));
  }

  onLoadingSuccess(payload) {
    this.loading = false;
    this.error = null;

    this.data = payload.reduce((acc, item) => {
      var clientId = _.uniqueId();
      acc[clientId] = { id: clientId, data: item, status: 'OK' };
      return acc;
    }, {});

    this.emit('change');
  }

  onLoadingFail(payload) {
    this.loading = false;
    this.error = payload.error;
    this.emit('change');
  }

  get(id) {
    return this.data[id];
  }
}

module.exports = ListStore;