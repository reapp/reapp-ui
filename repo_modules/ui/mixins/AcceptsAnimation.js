var React = require('react');

module.exports = function(...sources) {
  var contextTypes = {};

  if (sources)
    sources.forEach(source => {
      contextTypes[source + 'Step'] = React.PropTypes.number;
      contextTypes[source + 'Index'] = React.PropTypes.number;
    });

  return { contextTypes };
};