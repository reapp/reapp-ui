var _ = require('lodash-node');
var { Promise } = require('when');
var debug = require('debug')('g:flux:GetStores');

var Flux;
var storePromises = {};

var GetStores = function(storeNames) {
  var promises = {};

  [].concat(storeNames).forEach(function(name, params) {
    var hash = name + _.map(params, (h,k) => ""+h+k);
    console.log(name, Flux)
    var store = Flux.store(name);

    promises[name] = promiseForStore(hash, store);
    Flux.actions[name + 'Load'](params);
  });

  return promises;
};

function promiseForStore(hash, store) {
  var listener = storePromises[hash];
  if (listener) return listener;

  // debug('creating promise for', hash);

  listener = storePromises[hash] = new Promise(function(res, rej) {
    store.on('change', respond);

    function respond() {
      if (store.loading || !_.size(store.data)) return;
      // debug('promise done!', hash);
      var response = _.values(store.data);
      res(response);
    }
  });

  return listener;
}

module.exports = {
  GetStores,
  init(flux) { Flux = flux; }
};