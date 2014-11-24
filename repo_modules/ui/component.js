var React = require('react/addons');
var ReactStyle = require('react-style');
var Styled = require('./styled');
var Classed = require('./classed');
var UI = require('./index');

module.exports = function(name, spec) {
  var mixins = [].concat(spec.mixins || [], Styled(name), Classed(name), {
    componentProps(componentName) {
      return {
        ref: componentName || name,
        className: this.getClasses(componentName),
        styles: this.getStyles(componentName)
      };
    }
  });

  spec.displayName = name;
  spec.mixins = mixins;
  return React.createClass(spec);
};