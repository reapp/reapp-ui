var Component = require('reapp-component')();
var React = require('react');
var Styled = require('./mixins/Styled');
var Classed = require('./mixins/Classed');
var Animated = require('./mixins/Animated');
var Identified = require('./mixins/Identified');
var merge = require('lodash-node/modern/objects/merge');

// clone
Component.addStatics('clone', function(children, props, keepOriginalProps) {
  if (!children) return;

  return React.Children.map(children, (child, i) => {
    var curProps = (typeof props === 'function') ?
      props(child, i) :
      props;

    return React.isValidElement(child) ?
      React.addons.cloneWithProps(child, keepOriginalProps ?
        merge(child.props, curProps) :
        curProps) :
      child;
  });
});

Component.addDecorator(spec => {
  spec.mixins = [].concat(
    Identified,
    Styled(spec.name),
    Classed(spec.name),
    spec.mixins || [],
    {
      componentProps(componentName) {
        return {
          id: componentName ? this._uniqueID + componentName : this._uniqueID,
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