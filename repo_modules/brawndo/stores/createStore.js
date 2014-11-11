var Fluxxor = require('fluxxor');
var { Promise } = require('when');
var invariant = require('react/lib/invariant');

module.exports = function({ name, mixins, actions, ...spec }) {
  invariant(name && name.length, 'Must define a name');

  var Store = Object.assign({}, spec);
  Store.state = Store.state || {};

  var actionPromises = {};

  if (mixins)
    mixins.forEach(mixin => {
      addActionPromises(mixin.storeActions);
      addActionPromises(mixin.actions);
    });

  addActionPromises(actions);

  function addActionPromises(obj) {
    Object.keys(obj).forEach(key => {
      actionPromises[key] = actionPromises[key] || [];
      actionPromises[key].push(obj[key]);
    });
  }

  console.log('actions', actionPromises);

  Store.setState = function(newState) {
    Store.state = Object.assign({}, Store.state, newState);
    return Store;
  };

  var fluxxorActions = {};

  Object.keys(actionPromises).forEach(key => {
    fluxxorActions[`${name}:${key}`] = function(payload) {
      console.log('running action', name, key, payload);
      Store.payload = payload;

      actionPromises.forEach(actionPromise => {
        actionPromise(Store);
      });

      this.emit('change');
    };
  });

  console.log('fluxxor actions', fluxxorActions);

  // setup spec without mixins
  Store.initialize = function() {
    this.bindActions(fluxxorActions);
  };

  this.Stores[name] = Fluxxor.createStore(Store);
};