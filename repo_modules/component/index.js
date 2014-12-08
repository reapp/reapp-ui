var React = require('react');
var Invariant = require('react/lib/invariant');

var decorators = [];
var index = 0;

// Component is a helper designed for top-down applications
// It provides two things

function Component(spec) {
  decorators.forEach(decorator => {
    spec = decorator(spec);
  });

  return spec;
}

Component.addDecorator = decorator => {
  decorators.push(decorator);
};

Component.addStatics = function(name, statics) {
  if (!statics)
    addStaticsObj(name);
  else {
    var obj = {};
    obj[name] = statics;
    addStaticsObj(obj);
  }
};

function addStaticsObj(obj) {
  Invariant(Object.prototype.toString.call(obj) === '[object Object]',
    'Must provide an object to statics');

  Invariant(typeof obj.addDecorator === 'undefined',
    'Cannot overwrite addDecorator');

  Object.keys(obj).forEach(key => {
    Component[key] = obj[key];
  });
}

module.exports = Component;