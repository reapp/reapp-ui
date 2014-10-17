var React = require('react');
var invariant = require('react/lib/invariant');
var Fluxxor = require('fluxxor');
var Promise = require('when').Promise;
var _ = require('lodash-node');
var Actions = require('./actions/Actions');
var ENV = require('../ENV');
var debug = require('debug')('g:bootstrap');

var FluxMixin = Fluxxor.FluxMixin(React);
var FluxChildMixin = Fluxxor.FluxChildMixin(React);

// Stores
var ArticlesStore = require('./stores/ArticlesStore');
var ArticleStore = require('./stores/ArticleStore');

var stores = {
  articlesStore: new ArticlesStore(),
  articleStore: new ArticleStore()
};

var storePromises = {};
var Flux = new Fluxxor.Flux(stores, Actions);

var GetStores = function(params, storeNames) {
  invariant(ENV,
    'Must have ENV global set to detect CLIENT/SERVER.');

  var promises = {};

  storeNames.forEach(function(name) {
    var hash = name + _.map(params, (h,k) => ""+h+k);
    var store = Flux.store(name + 'Store');

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

module.exports = {
  FluxMixin: FluxMixin,
  FluxChildMixin: FluxChildMixin,
  Flux: Flux,
  GetStores: GetStores
};