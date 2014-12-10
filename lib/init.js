require('es-object-assign');

var React = require('react/addons');
var Component = require('../app/component');
var Mixins = require('../app/mixins');

Component.addStatics('helpers', require('./helpers/helpers'));
Component.addStatics('mixins', require('./mixins/mixins'));
Component.addStatics('stores', require('../app/stores'));
Component.addStatics('actions', require('../app/actions'));

// mixins decorator
Component.addDecorator(spec => {
  if (spec.mixins)
    spec.mixins = spec.mixins.map(mixin =>
      (typeof mixin === 'string') ? Mixins.shared[mixin] : mixin);

  spec.mixins = Mixins.global.concat(spec.mixins);
  return spec;
});

// displayName decorator
var index = 0;
Component.addDecorator(spec => {
  // add index for react-hot-loader
  spec.displayName = spec.displayName || index++;
  return React.createClass(spec);
});

// exports to window
if (require('./env').CLIENT) {
  window.Component = Component;
  window.React = React;
}
