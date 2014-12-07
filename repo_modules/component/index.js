var React = require('react');
var Invariant = require('react/lib/invariant');

var decorators = [];
var index = 0;

function Component(spec) {
  decorators.forEach(decorator => {
    spec = decorator(spec);
  });

  spec.displayName = spec.displayName || index++;
  return React.createClass(spec);
}

Component.addDecorator = decorator => {
  decorators.push(decorator);
};

Component.addStatics = function(statics) {
  Invariant(Object.prototype.toString.call(statics) === '[object Object]',
    'Must provide an object as statics');

  Invariant(typeof statics.addDecorator === 'undefined',
    'Cannot overwrite addDecorator');

  Object.keys(statics).forEach(key => {
    this[key] = statics[key];
  });
};

module.exports = Component;