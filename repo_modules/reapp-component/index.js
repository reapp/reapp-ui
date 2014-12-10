var React = require('react');
var Invariant = require('react/lib/invariant');

// Component is a library designed for top-down applications
// It provides two things
//  - a factory with decorators through .factory
//  - dependency injection through addStatics

// Because React apps use gradual controller-view -> view trees
// DI is typically very simple and more akin to global variables

// Decorators are helpful for medium to large scale apps.
// They can help you have default mixins, and automate other small common tasks

// Usage:
//   var c1 = Component()
//   c1.addDecorator(spec => { decorated: true })
//   c1.addStatics('hello', 'world');
//   assert(c1.hello === 'world');
//   assert(c1() === { decorated: true })

function Component() {
  var decorators = [];
  var factory = function(spec) {
    decorators.forEach(decorator => {
      spec = decorator(spec);
    });
    return spec;
  };

  factory.addDecorator = function(decorator) {
    decorators.push(decorator);
  };

  factory.addStatics = function(name, statics) {
    if (!statics)
      this.addStaticsObj(name);
    else {
      var obj = {};
      obj[name] = statics;
      this.addStaticsObj(obj);
    }
  };

  factory.addStaticsObj = function(obj) {
    Invariant(Object.prototype.toString.call(obj) === '[object Object]',
      'Must provide an object to statics');

    Object.keys(obj).forEach(key => {
      this[key] = obj[key];
    });
  };

  return factory;
}

module.exports = Component;