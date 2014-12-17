var React = require('react');

module.exports = function(contexts) {
  var contextTypes = {};

  if (contexts)
    Object.keys(contexts).forEach(key => {
      contextTypes[key] = React.PropTypes[contexts[key]];
    });

  return { contextTypes };
};