var React = require('react');
var invariant = require('react/lib/invariant');
var Fluxxor = require('fluxxor');
var Promise = require('when').Promise;
var _ = require('lodash-node');
var Actions = require('./actions/Actions');
var ENV = require('../ENV');
var debug = require('debug')('g:flux');

var FluxMixin = Fluxxor.FluxMixin(React);

// Stores
var ArticlesStore = require('./stores/ArticlesStore');

var Stores = {
  articles: new ArticlesStore()
};

var storePromises = {};
var Flux = new Fluxxor.Flux(Stores, Actions);

var GetStores = function(params, storeNames) {
  invariant(ENV,
    'Must have ENV global set to detect CLIENT/SERVER.');

  var promises = {};

  storeNames.forEach(function(name) {
    var hash = name + _.map(params, (h,k) => ""+h+k);
    var store = Flux.store(name);

    promises[name] = createStorePromise(hash, store);
    Flux.actions[name + 'Load'](params);
  });

  return promises;
}

function createStorePromise(hash, store) {
  var listener = storePromises[hash];
  if (listener) return listener;

  debug('creating promise for %s', hash);

  listener = storePromises[hash] = new Promise(function(res, rej) {
    store.on('change', respond);

    function respond() {
      console.log(store)
      if (store.loading || !_.size(store.data)) return;
      var response = _.values(store.data);
      debug('resolving promise with %s', response);
      res(response);
    }
  });

  return listener;
}

if (ENV.CLIENT) {
  window.stores = Stores;

  Flux.on('dispatch', function(type, payload) {
    debug("[Dispatch]", type, payload);
  });
}

module.exports = {
  StoreWatchMixin: Fluxxor.StoreWatchMixin,
  FluxMixin: FluxMixin,
  Flux: Flux,
  GetStores: GetStores
};