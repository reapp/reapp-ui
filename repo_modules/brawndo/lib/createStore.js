var Fluxxor = require('fluxxor');
var invariant = require('react/lib/invariant');

module.exports = function({ name, mixins, actions, state, ...spec }) {
  invariant(name && name.length, 'Must define a name');

  var Store = Object.assign({}, spec);
  var combinedActions = {};
  var getStore = this.getStore;

  state = state || {};

  // add mixins
  if (mixins)
    mixins.forEach(mixin => {
      addActions(mixin.storeActions);
      addActions(mixin.actions);
      addMixinState(mixin);
      addMixinExpose(mixin);
    });

  // store actions come after mixin actions
  addActions(actions);

  function addActions(obj) {
    if (!obj) return;
    Object.keys(obj).forEach(key => {
      combinedActions[key] = combinedActions[key] || [];
      combinedActions[key].push(obj[key]);
    });
  }

  function addMixinExpose(mixin) {
    if (!mixin.expose) return;
    Object.keys(mixin.expose).forEach(key => {
      invariant(!Store[key], `Store already has method ${key} (adding key from mixin ${mixin.name})`);
      Store[key] = mixin.expose[key];
    });
  }

  function addMixinState(mixin) {
    if (!mixin.state) return;
    Object.keys(mixin.state).forEach(key => {
      invariant(!state[key], `Store already has state ${key} (adding key from mixin ${mixin.name})`);
      state[key] = mixin.state[key];
    });
  }

  var fluxxorActions = {};

  Object.keys(combinedActions).forEach(key => {
    var combinedAction = combinedActions[key];

    fluxxorActions[`${name}:${key}`] = function(payload) {
      var store = getStore(name);

      store.payload = payload;
      combinedAction.forEach(action => action(store));
      store.payload = null;

      this.emit('change');
    };
  });

  var fluxxor;

  Store.initialize = function() {
    // console.log('initializing with actions', fluxxorActions);
    fluxxor = this;
    this.state = state;
    this.bindActions(fluxxorActions);
  };

  Store.setState = newState => {
    fluxxor.state = Object.assign({}, fluxxor.state, newState);
    return getStore(name);
  };

  Store.setPayload = newPayload => {
    var store = getStore(name);
    store.payload = newPayload;
    return store;
  };

  var FluxxorStore = Fluxxor.createStore(Store);
  this.addStore(name, new FluxxorStore());
};