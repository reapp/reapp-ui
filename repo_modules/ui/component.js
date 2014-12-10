var Component = require('reapp-component')();
var React = require('react');
var Styled = require('./mixins/Styled');
var Classed = require('./mixins/Classed');
var Layered = require('./mixins/Layered');
var Animated = require('./mixins/Animated');

Component.addDecorator(spec => {
  spec.mixins = [].concat(
    Layered,
    Animated,
    Styled(spec.name),
    Classed(spec.name),
    spec.mixins || [],
    {
      componentProps(componentName) {
        return {
          ref: componentName || spec.name,
          className: this.getClasses(componentName),
          styles: this.getStyles(componentName)
        };
      }
    }
  );

  spec.displayName = 'UI-' + spec.name;

  // allow checking for "isName" on all components
  spec.statics = spec.statics || {};
  spec.statics[`is${spec.name}`] = true;

  return React.createClass(spec);
});

module.exports = Component;