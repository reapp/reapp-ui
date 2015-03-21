// Decoration for every component used internally in reapp-ui

var Component = require('reapp-component')();
var React = require('react');
var Styled = require('./mixins/Styled');
var Classed = require('./mixins/Classed');
var Constanted = require('./mixins/Constanted');
var Animated = require('./mixins/Animated');
var ComponentProps = require('./mixins/ComponentProps');

Component.addDecorator(spec => {

  Object.assign(spec, ComponentProps, Animated, Constanted);

  // add context for theme
  spec.contextTypes = {
    theme: React.PropTypes.object,
    animations: React.PropTypes.object
  };

  // mixins
  spec.mixins = [].concat(
    Classed,
    Styled,
    spec.mixins || []
  );

  // add UI displayname to help with debugging
  spec.displayName = spec.name;

  // wrap in createClass
  return React.createClass(spec);
});

module.exports = Component;