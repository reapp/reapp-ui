var React = require('react/addons');
var ReactStyle = require('react-style');
var Styled = require('./mixins/Styled');
var Classed = require('./mixins/Classed');
var Layered = require('./mixins/Layered');
var UI = require('./index');

module.exports = function(name, spec) {
  var mixins = [].concat(
    spec.mixins || [],
    Layered,
    Styled(name),
    Classed(name),
    {
      // allow access to layers
      contextTypes: {
        layer: React.PropTypes.number.isRequired
      },

      componentProps(componentName) {
        return {
          ref: componentName || name,
          className: this.getClasses(componentName),
          styles: this.getStyles(componentName)
        };
      }
    }
  );

  spec.displayName = name;
  spec.mixins = mixins;
  return React.createClass(spec);
};