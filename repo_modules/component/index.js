var Omniscient = require('omniscient');

module.exports = function(struct) {
  var { name, mixins, render } = struct;
  var args = [name, mixins, render].filter(x => x !== undefined);

  var component = Omniscient.apply(this, args);
  return component;
};