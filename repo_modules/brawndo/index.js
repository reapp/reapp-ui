var Fluxxor = require('fluxxor');
var debug = require('debug')('g:flux');
var StoreLoader = require('./lib/StoreLoader');
var Flux;

var Brawndo = module.exports = {
  Actions: {},
  Stores: {},

  Mixins: {
    Loadable: require('./mixins/Loadable'),
    Reducable: require('./mixins/Reducable')
  },

  createStore: require('./lib/createStore'),
  createMixin: require('./lib/createMixin'),
  addActions,

  StoreWatchMixin: Fluxxor.StoreWatchMixin,

  init(React) {
    initActions();
    Flux = new Fluxxor.Flux(Brawndo.Stores, Brawndo.Actions);
    Brawndo.StoreLoader = StoreLoader.init(Flux);
    Brawndo.FluxMixin = Fluxxor.FluxMixin(React);
    exposeFlux(Flux);
    return Flux;
  }
};

function addActions(actions) {
  Object.assign(Brawndo.Actions, actions);
}

// binds with Loadable stores
var loadWithDispatcher = function(name, action) {
  var self = this;
  self.dispatch(`${name}:load`);

  var dispatchSuccess = payload => self.dispatch(`${name}:loadSuccess`, payload);
  var dispatchFail = payload => self.dispatch(`${name}:loadFail`, payload);

  action().done(
    res => dispatchSuccess(res),
    res => dispatchFail(res)
  );
};

function initActions() {
  Object.keys(Brawndo.Actions).map(key => {
    // if name of store == action, set it up as a loader
    if (Brawndo.Stores[key]) {
      var action = Brawndo.Actions[key];
      Brawndo.Actions[key] = function() {
        loadWithDispatcher.call(this, key, action);
      };
    }
  });
}

function exposeFlux(Flux) {
  var ENV = {
    CLIENT: typeof window !== 'undefined',
    SERVER: typeof window === 'undefined'
  };

  if (ENV.CLIENT) {
    window.stores = Brawndo.Stores;

    Flux.on('dispatch', function(type, payload) {
      debug(type, payload);
    });

    window.flux = window.flux || {};
    window.flux.actions = Brawndo.Actions;
  }
}