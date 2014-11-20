var Fluxxor = require('fluxxor');
var invariant = require('react/lib/invariant');

module.exports = function(name, data, ...mixins) {
  invariant(name && data, 'Must define a name and data source');

  var combinedActions = {};
  var getStore = this.getStore;
  var mixinInitializers = [];

  state = state || {};

  // add mixins
  if (mixins)
    mixins.forEach(mixin => {
      addActions(mixin.storeActions);
      addActions(mixin.actions);
      addMixinState(mixin);
      addMixinExpose(mixin);
      addMixinInitialize(mixin);
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

  function addMixinState(mixin) {
    if (!mixin.state) return;
    Object.keys(mixin.state).forEach(key => {
      invariant(!state[key], `Store already has state ${key} (adding key from mixin ${mixin.name})`);
      state[key] = mixin.state[key];
    });
  }

  function addMixinExpose(mixin) {
    if (!mixin.expose) return;
    Object.keys(mixin.expose).forEach(key => {
      invariant(!Store[key], `Store already has method ${key} (adding key from mixin ${mixin.name})`);
      Store[key] = mixin.expose[key];
    });
  }

  function addMixinInitialize(mixin) {
    if (!mixin.initialize) return;
    mixinInitializers.push(mixin.initialize);
  }

  var fluxxorActions = {};

  Object.keys(combinedActions).forEach(key => {
    var combinedAction = combinedActions[key];

    fluxxorActions[key] = function(payload) {
      var store = getStore(name);

      store.payload = payload;
      combinedAction.forEach(action => action.call(this));
      store.payload = null;

      this.emit('change');
    };
  });

  var fluxxor;

  Store.initialize = function() {
    fluxxor = this;
    this.state = state;

    this.setState = newState => {
      this.state = Object.assign({}, this.state, newState);
      return this;
    };

    this.replaceState = newState => {
      this.state = newState;
      return this;
    };

    this.setPayload = newPayload => {
      this.payload = newPayload;
      return this;
    };

    mixinInitializers.forEach(initializer => initializer.call(this));
    this.bindActions(fluxxorActions);
  };

  var FluxxorStore = Fluxxor.createStore(Store);
  this.addStore(name, new FluxxorStore());
};