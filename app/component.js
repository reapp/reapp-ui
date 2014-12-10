var Component = require('reapp-component')();

// add any spec decorators or statics variables here

Component.addStatics('stores', require('./stores'));
Component.addStatics('actions', require('./actions'));

// mixins decorator
var Mixins = require('./mixins');
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

module.exports = Component;