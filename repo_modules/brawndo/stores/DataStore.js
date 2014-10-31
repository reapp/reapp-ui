var Store = require('./Store');
var _ = require('lodash-node');

class DataStore extends Store {
  constructor(name, actions) {
    this.loading = false;
    this.data = {};

    var storeActions = {};
    storeActions[`LOAD_${name}`] = this.onLoading;
    storeActions[`LOAD_${name}_SUCCESS`] = this.onLoadingSuccess;
    storeActions[`LOAD_${name}_FAIL`] = this.onLoadingFail;

    super(name, _.merge(storeActions, actions));
  }

  reducePayload(payload) {
    return payload.reduce((acc, item) => {
      var clientId = _.uniqueId();
      acc[clientId] = { id: clientId, data: item, status: 'OK' };
      return acc;
    }, {});
  }

  onLoading() {
    this.loading = true;
    this.emit('change');
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
    this.error = payload;
    this.emit('change');
  }
}

module.exports = DataStore;