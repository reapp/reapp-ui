var React = require('react');
var invariant = require('react/lib/invariant');
var Fluxxor = require('fluxxor');
var Promise = require('when').Promise;
var _ = require('lodash-node');
var FluxxorAutobind = require('fluxxor-autobind');
var Actions = require('./actions/Actions');
var ENV = require('../ENV');

var FluxMixin = Fluxxor.FluxMixin(React);
var FluxChildMixin = Fluxxor.FluxChildMixin(React);

// Stores
var ArticleStore = require('./stores/ArticleStore');

var stores = {
  articleStore: new ArticleStore()
};

var Flux = new Fluxxor.Flux(stores, Actions);
FluxxorAutobind.install(Flux);

var GetStores = function() {
  invariant(ENV,
    'Must have ENV global set to detect CLIENT/SERVER.');

  var storeNames = Array.prototype.slice.call(arguments, 0);
  var result = {};

  storeNames.forEach(function(name) {
    var store = Flux.store(name + 'Store');
    result[name] = storePromise(store);
    Flux.actions[name + 'Load']();
  });

  return result;
}

function storePromise(store) {
  return new Promise(function(res, rej) {
    store.on('change', () => {
      if (_.size(store.data))
        res(_.values(store.data))
    });
  })
}

module.exports = {
  FluxMixin: FluxMixin,
  FluxChildMixin: FluxChildMixin,
  Flux: Flux,
  GetStores: GetStores
};