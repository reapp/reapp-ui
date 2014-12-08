require('es-object-assign');

var React = require('react');
var Component = require('component');
var Mixins = require('../app/mixins');

Component.addStatics('helpers', require('./helpers/helpers'));
Component.addStatics('mixins', require('./mixins/mixins'));
Component.addStatics('stores', require('../app/stores'));
Component.addStatics('actions', require('../app/actions'));

Component.addDecorator(spec => {
  if (spec.mixins)
    spec.mixins = spec.mixins.map(mixin =>
      (typeof mixin === 'string') ? Mixins.shared[mixin] : mixin);

  return spec;
});

Component.addDecorator(spec => {
  spec.mixins = Mixins.global.concat(spec.mixins);
  return spec;
});

var index = 0;
Component.addDecorator(spec => {
  // add index for react-hot-loader
  spec.displayName = spec.displayName || index++;
  return React.createClass(spec);
});