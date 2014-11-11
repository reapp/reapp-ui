var Fluxxor = require('fluxxor');
var debug = require('debug')('g:flux');
var StoreLoader = require('./lib/StoreLoader');

var Flux;
var _actions = {};
var _stores = {};

var Brawndo = module.exports = {
  addStore,
  getStore,
  addActions,

  Mixins: {
    Loadable: require('./mixins/Loadable'),
    Reducable: require('./mixins/Reducable')
  },

  createStore: require('./lib/createStore'),
  createMixin: require('./lib/createMixin'),

  StoreWatchMixin: Fluxxor.StoreWatchMixin,

  init(React) {
    initActions();
    Flux = new Fluxxor.Flux(_stores, _actions);
    Brawndo.StoreLoader = StoreLoader.init(Flux);
    Brawndo.FluxMixin = Fluxxor.FluxMixin(React);
    exposeToBrowser(Flux);
    return Flux;
  }
};

function addStore(name, store) {
  _stores[name] = store;
  console.log('added store', name, _stores);
}

function getStore(name) {
  return _stores[name];
}

function addActions(actions) {
  Object.assign(_actions, actions);
}

// works with Loadable stores
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
  Object.keys(_actions).map(key => {
    // if name of store == action, set it up as a loader
    if (_stores[key]) {
      var action = _actions[key];
      _actions[key] = function() {
        loadWithDispatcher.call(this, key, action);
      };
    }
  });
}

function exposeToBrowser(Flux) {
  if (typeof window !== 'undefined') {
    Flux.on('dispatch', function(type, payload) {
      debug(type, payload);
    });

    window.brawndo = {
      stores: _stores,
      actions: _actions,
    };
  }
}