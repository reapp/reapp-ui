var Fluxxor = require('fluxxor');
var { Promise } = require('when');
var invariant = require('react/lib/invariant');

module.exports = function({ name, mixins, actions, state, ...spec }) {
  invariant(name && name.length, 'Must define a name');

  var Store = Object.assign({}, spec);
  state = state || {};

  var combinedActions = {};

  if (mixins)
    mixins.forEach(mixin => {
      addActions(mixin.storeActions);
      addActions(mixin.actions);
      addExposedMethods(mixin);
    });

  addActions(actions);

  function addActions(obj) {
    if (!obj) return;
    Object.keys(obj).forEach(key => {
      combinedActions[key] = combinedActions[key] || [];
      combinedActions[key].push(obj[key]);
    });
  }

  function addExposedMethods(mixin) {
    if (!mixin.expose) return;
    Object.keys(mixin.expose).forEach(key => {
      invariant(!Store[key], `Store already has key ${key} from mixin ${mixin.name}`);
      Store[key] = mixin.expose[key];
    });
  }

  console.log('all actions', combinedActions);

  var fluxxorActions = {};

  Object.keys(combinedActions).forEach(key => {
    var combinedAction = combinedActions[key];

    fluxxorActions[`${name}:${key}`] = function(payload) {
      console.log('running action', name, key, payload);
      Store.payload = payload;

      combinedAction.forEach(action => {
        action(Store);
      });

      console.log('emitting change');
      this.emit('change');
    };
  });

  console.log('setup store')

  // setup spec without mixins
  var fluxxor;

  Store.initialize = function() {
    console.log('initializing with actions', fluxxorActions);
    fluxxor = this;
    this.state = state;
    this.bindActions(fluxxorActions);
  };

  Store.setState = newState => {
    fluxxor.state = Object.assign({}, fluxxor.state, newState);
    return this.Stores[name];
  };

  var FluxxorStore = Fluxxor.createStore(Store);
  this.Stores[name] = new FluxxorStore();
};