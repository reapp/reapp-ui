// This is a function that decorates React's createClass.
// It's used only internally in this library.
// See the mixins for more information on what this does.

var Component = require('reapp-component')();
var React = require('react');
var Identified = require('./mixins/Identified');
var Styled = require('./mixins/Styled');
var Classed = require('./mixins/Classed');
var Animated = require('./mixins/Animated');

Component.addDecorator(spec => {
  spec.mixins = [].concat(
    // global component mixins
    Identified,
    Styled(spec.name),
    Classed(spec.name),
    Animated,

    // any component-defined mixins
    spec.mixins || [],

    // componentProps is the meat of a UI component
    // when used, it will handle: id, ref, className, styles, animations
    {
      componentProps(componentName) {
        // 'self' is used for the top level ref
        var ref = componentName || 'self';
        var props = {
          ref,
          id: componentName ? this._uniqueID + componentName : this._uniqueID,
          className: this.getClasses(componentName),
          styles: this.getStyles(componentName)
        };

        if (this.hasAnimations(ref) && !this.animationsDisabled())
          props.style = this.getAnimationStyle(ref);

        return props;
      }
    }
  );

  // set UI displayname to help with debugging
  spec.displayName = 'UI-' + spec.name;

  // allow checking for 'is___' on all components
  spec.statics = spec.statics || {};
  spec.statics[`is${spec.name}`] = true;

  return React.createClass(spec);
});

module.exports = Component;