var React = require('react');
var invariant = require('react/lib/invariant');
var Fluxxor = require('fluxxor');
var Promise = require('when').Promise;
var _ = require('lodash-node');
var FluxxorAutobind = require('fluxxor-autobind');
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

var storeListeners = {};

var Flux = new Fluxxor.Flux(stores, Actions);
FluxxorAutobind.install(Flux);

var GetStores = function(params, names) {
  invariant(ENV,
    'Must have ENV global set to detect CLIENT/SERVER.');

  var storeNames = names;
  var result = {};

  storeNames.forEach(function(name) {
    var store = Flux.store(name + 'Store');
    result[name] = storePromise(name, store);
    Flux.actions[name + 'Load'](params);
    debug('promise for %s GetStores: %s', name, result[name]);
  });

  return result;
}

function storePromise(name, store) {
  var listener = storeListeners[name];

  if (!listener) {
    debug('creating promise for %s', name);
    listener = storeListeners[name] = new Promise(function(res, rej) {
      store.on('change', () => {
        debug('change (isloading %s) (size %s)', store.loading, _.size(store.data));
        if (!store.loading && _.size(store.data)) {
          var response = _.values(store.data);
          debug('resolving promise with %s', response);
          res(response);
        }
      });
    });
  }

  return listener;
}

module.exports = {
  FluxMixin: FluxMixin,
  FluxChildMixin: FluxChildMixin,
  Flux: Flux,
  GetStores: GetStores
};