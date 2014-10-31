var Fluxxor = require('fluxxor');
var debug = require('debug')('g:flux');
var StoreLoader = require('./lib/StoreLoader');
var Dispatcher = require('./lib/Dispatcher');
var ListStore = require('./lib/ListStore');
var ItemStore = require('./lib/ItemStore');
var Flux;

var Brawndo = module.exports = {
  Stores: { ListStore, ItemStore },
  StoreWatchMixin: Fluxxor.StoreWatchMixin,

  init({ React, Actions, Stores }) {
    Stores = initStores(Stores);
    Actions = initActions(Actions);
    Flux = new Fluxxor.Flux(Stores, Actions);
    Brawndo.StoreLoader = StoreLoader.init(Flux);
    Brawndo.FluxMixin = Fluxxor.FluxMixin(React);
    exposeFlux(Flux, Stores, Actions);
    return Flux;
  }
};

function initActions(actions) {
  return Object.keys(actions).map(key => {
    return /Load$/.test(key) ?
      Dispatcher.create.call(Flux, key, actions[key]) :
      actions[key];
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