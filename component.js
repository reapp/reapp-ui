// This is a function that decorates React's createClass.
// It's used only internally in this library,
// but could be used externally eventually.

// See the mixins for more information on what this does.

var UI = require('reapp-ui');
var Component = require('reapp-component')();
var React = require('react');
var Styled = require('./mixins/Styled');
var Classed = require('./mixins/Classed');
var Constanted = require('./mixins/Constanted');
var Animated = require('./mixins/Animated');
var ComponentProps = require('./mixins/ComponentProps');

Component.addDecorator(spec => {

  // add context for theme
  spec.contextTypes = Object.assign({
    theme: React.PropTypes.object
  }, spec.contextTypes);

  // mixins
  spec.mixins = [].concat(
    Classed,
    Constanted,
    Styled,
    Animated,
    spec.mixins || [],

    // componentProps is the meat of a UI component
    // when used, it will handle: ref, className, styles, animations
    ComponentProps
  );

  // add UI displayname to help with debugging
  spec.displayName = spec.name;

  // wrap in createClass
  return React.createClass(spec);
});

module.exports = Component;