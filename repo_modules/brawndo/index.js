var Fluxxor = require('fluxxor');
var debug = require('debug')('g:flux');
var StoreLoader = require('./lib/StoreLoader');
var Dispatcher = require('./lib/Dispatcher');
var ListStore = require('./stores/ListStore');
var ItemStore = require('./stores/ItemStore');
var Flux;

var Brawndo = module.exports = {
  Stores: { ListStore, ItemStore },
  StoreWatchMixin: Fluxxor.StoreWatchMixin,

  init({ React, Actions, Stores }) {
    initStores(Stores);
    initActions(Stores, Actions);
    Flux = new Fluxxor.Flux(Stores, Actions);
    Brawndo.StoreLoader = StoreLoader.init(Flux);
    Brawndo.FluxMixin = Fluxxor.FluxMixin(React);
    exposeFlux(Flux, Stores, Actions);
    return Flux;
  }
};

var loadWithDispatcher = function(name, action) {
  var self = this;
  var dispatchLoad = () => self.dispatch(`LOAD_${name}`);
  var dispatchSuccess = () => self.dispatch(`LOAD_${name}_SUCCESS`);
  var dispatchFail = () => self.dispatch(`LOAD_${name}_FAIL`);

  return dispatchLoad() && Promise(action()).then(dispatchSuccess, dispatchFail);
};

function initActions(stores, actions) {
  Object.keys(actions).map(key => {
    // if name of store == action, set it up as a loader
    if (false && stores[key])
      actions[key] = function() {
        loadWithDispatcher.call(this, key, actions[key]);
      };
  });
}

function initStores(stores) {
  Object.keys(stores).map(key => {
    stores[key] = stores[key].getFlux();
  });
}

function exposeFlux(Flux, stores, actions) {
  var ENV = {
    CLIENT: typeof window !== 'undefined',
    SERVER: typeof window === 'undefined'
  };

  if (ENV.CLIENT) {
    window.stores = stores;

    Flux.on('dispatch', function(type, payload) {
      debug(type, payload);
    });

    window.flux = window.flux || {};
    window.flux.actions = actions;
  }
}