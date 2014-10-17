var invariant = require('react/lib/invariant');
var _ = require('lodash-node');
var Promise = require('when').Promise;
var debug = require('debug')('g:flux:GetStores');
var ENV = require('../../ENV');

var Flux;
var storePromises = {};

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

module.exports = {
  init(flux) {
    Flux = flux;
    return GetStores;
  }
};