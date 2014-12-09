var React = require('react');

module.exports = function(...sources) {
  var contextTypes = {};

  if (sources)
    sources.forEach(source => {
      contextTypes[source] = React.PropTypes.object;
    });

  return { contextTypes };
};