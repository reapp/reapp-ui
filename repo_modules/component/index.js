var React = require('react/addons');
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
  this.statics = this.statics || {};
  Object.assign(this.statics, statics);
};

module.exports = Component;