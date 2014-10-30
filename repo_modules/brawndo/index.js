var React = require('react');
var Fluxxor = require('fluxxor');
var debug = require('debug')('g:flux');
var GetStores = require('./lib/GetStores');
var Client = require('./client');
var Dispatcher = require('./lib/Dispatcher');
var ListStore = require('./lib/ListStore');
var ItemStore = require('./lib/ItemStore');

function init(stores, actions) {
  var Flux = new Fluxxor.Flux(stores, actions);
  Brawndo.Flux = Flux;
  GetStores.init(Flux);
  exposeFlux(Flux, stores, actions);
}

var Brawndo = module.exports = {
  init,
  ListStore,
  ItemStore,
  Client,
  Dispatcher,
  GetStores: GetStores.GetStores,
  StoreWatchMixin: Fluxxor.StoreWatchMixin,
  FluxMixin: Fluxxor.FluxMixin(React)
};

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