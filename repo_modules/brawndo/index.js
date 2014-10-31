var Fluxxor = require('fluxxor');
var debug = require('debug')('g:flux');
var StoreLoader = require('./lib/StoreLoader');
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
  var dispatchSuccess = payload => self.dispatch(`LOAD_${name}_SUCCESS`, payload);
  var dispatchFail = payload => self.dispatch(`LOAD_${name}_FAIL`, payload);

  this.dispatch(`LOAD_${name}`);
  action().done(
    res => dispatchSuccess(res),
    res => dispatchFail(res)
  );
};

function initActions(stores, actions) {
  Object.keys(actions).map(key => {
    // if name of store == action, set it up as a loader
    if (stores[key]) {
      var action = actions[key];
      actions[key] = function() {
        loadWithDispatcher.call(this, key, action);
      };
    }
  });
}

function initStores(stores) {
  Object.keys(stores).map(key => {
    stores[key] = new (stores[key].getFlux())();
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