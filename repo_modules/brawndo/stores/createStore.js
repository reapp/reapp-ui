var Fluxxor = require('fluxxor');
var _ = require('lodash-node');

module.exports = function({ mixins, actions, ...spec }) {
  var mergedSpec;

  if (Array.isArray(mixins))
    mergedSpec = _.reduce(mixins, (acc, mixin) => {
      var {
        name: mixinName,
        actions: mixinActions,
        properties
      } = mixin;

      var actionCb = actions['on' + mixinName];

      Object.keys(mixinActions).forEach(key => {
        actions[key] = function(payload) {
          mixinActions[key](payload, function(nextPayload) {
            // next('onmixinAction', payload);
            if (actionCb) actionCb(key, nextPayload);
          });
        };
      });

      Object.keys(properties).forEach(key => {
        if (acc[key]) throw Error('Merging duplicate key!');
        acc[key] = properties[key];
      });

    }, {});

  return Fluxxor.createStore(mergedSpec || spec);

};