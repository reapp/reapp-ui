var Brawndo = require('brawndo');
var _ = require('lodash-node');

var name = 'articles';

var Loadable = {
  name: 'Loadable',
  properties: {
    loadState: undefined,
  },
  actions: {
    onLoad: function(payload, next) {
      this.loadState = 'loading';
      next();
    },
    onLoadSuccess: function(payload, next) {
      this.loadState = 'succeeded';
      next(payload);
    },
    onLoadFail: function(payload, next) {
      this.loadState = 'failed';
      next(payload);
    }
  }
};

var Store = Brawndo.createStore({
  name: name,

  mixins: [Loadable],

  actions: {
    test: function() {}
  },

  data: {},

  reducePayload(payload) {
    return [].concat(payload).reduce((acc, item) => {
      var clientId = _.uniqueId();
      acc[clientId] = { id: clientId, data: item, status: 'OK' };
      return acc;
    }, {});
  },

  onLoadable(action, payload) {
    switch(action) {
      case 'onLoadingSuccess':
        this.data = reducePayload(payload);
        break;

      case 'onLoadingFail':
        this.data = undefined;
        this.error = payload;
    }

    this.emit('change');
  }
});

module.exports = {
  getFlux() {
    return Store;
  }
};