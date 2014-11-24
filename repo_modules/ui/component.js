var React = require('react/addons');
var ReactStyle = require('react-style');
var Styled = require('./styled');
var Classed = require('./classed');
var UI = require('./index');

module.exports = function(name, spec) {
  var mixins = [].concat(spec.mixins || [], Styled(name), Classed(name), {
    componentProps(name) {
      return {
        ref: name,
        className: this.getClasses(name),
        styles: this.getStyles(name)
      };
    }
  });

  spec.displayName = name;
  spec.mixins = mixins;
  return React.createClass(spec);
};