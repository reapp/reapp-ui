var React = require('react/addons');
var transformers = [];
var index = 0;

function Component(spec) {
  transformers.forEach(transformer => {
    spec = transformer(spec);
  });

  spec.displayName = spec.displayName || index++;
  return React.createClass(spec);
}

Component.addTransformer = transformer => {
  transformers.push(transformer);
};

module.exports = Component;