var _ = require('lodash-node');

var DataStoreMixin = module.exports = {
  initialize: function(name) {
    this.loading = false;
    this.data = {};

    var storeActions = {};
    storeActions[`LOAD_${name}`] = this.onLoading;
    storeActions[`LOAD_${name}_SUCCESS`] = this.onLoadingSuccess;
    storeActions[`LOAD_${name}_FAIL`] = this.onLoadingFail;

    return storeActions;
  },

  reducePayload(payload) {
    return payload.reduce((acc, item) => {
      var clientId = _.uniqueId();
      acc[clientId] = { id: clientId, data: item, status: 'OK' };
      return acc;
    }, {});
  },

  onLoading() {
    this.loading = true;
    this.emit('change');
  },

  onLoadingSuccess(payload) {
    this.loading = false;
    this.error = null;

    this.data = [].concat(payload).reduce((acc, item) => {
      var clientId = _.uniqueId();

      acc[clientId] = {
        id: clientId,
        data: item,
        status: 'OK'
      };

      return acc;
    }, {});

    this.emit('change');
  },

  onLoadingFail(payload) {
    this.loading = false;
    this.error = payload;
    this.emit('change');
  }
};