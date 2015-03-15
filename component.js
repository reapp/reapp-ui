// This is a function that decorates React's createClass.
// It's used only internally in this library,
// but could be used externally eventually.

// See the mixins for more information on what this does.

var UI = require('reapp-ui');
var Component = require('reapp-component')();
var React = require('react');
var Identified = require('./mixins/Identified');
var Styled = require('./mixins/Styled');
var Classed = require('./mixins/Classed');
var Animated = require('./mixins/Animated');
var ComponentProps = require('./mixins/ComponentProps');

Component.addDecorator(spec => {
  spec.mixins = [].concat(
    // unique ids and classes
    Identified,
    Classed(spec.name),

    // constants
    { getConstant: UI.getConstants },

    // styles and animations
    Styled(spec.name, UI.getStyles),
    Animated(UI.getAnimations),

    // any component-defined mixins
    spec.mixins || [],

    // componentProps is the meat of a UI component
    // when used, it will handle: id, ref, className, styles, animations
    ComponentProps
  );

  // set UI displayname to help with debugging
  spec.displayName = `UI-${spec.name}`;

  return React.createClass(spec);
});

module.exports = Component;