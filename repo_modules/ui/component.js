var React = require('react/addons');
var ReactStyle = require('react-style');
var Styled = require('./mixins/Styled');
var Classed = require('./mixins/Classed');
var Layered = require('./mixins/Layered');
var Animated = require('./mixins/Animated');
var UI = require('./index');

module.exports = function(name, spec) {
  var mixins = [].concat(
    // React.addons.PureRenderMixin,
    Layered,
    Animated,
    Styled(name),
    Classed(name),
    spec.mixins || [],
    {
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

  // allow checking for "isName" on all components
  spec.statics = (spec.statics || {});
  spec.statics[`is${name}`] = true;

  return React.createClass(spec);
};