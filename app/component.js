var Component = require('reapp-component')();
var Mixins = require('./mixins');

// statics
Component.addStatics('stores', require('./stores'));
Component.addStatics('actions', require('./actions'));

// decorators
Component.addDecorator(spec => {
  spec = decorateMixins(spec);
  // add createClass
  return React.createClass(spec);
});

// adds support for string mixins and global mixins
function decorateMixins(spec) {
  if (spec.mixins)
    spec.mixins = spec.mixins.map(mixin =>
      typeof mixin === 'string' ? Mixins.shared[mixin] : mixin);

  spec.mixins = Mixins.global.concat(spec.mixins);
  return spec;
}

module.exports = Component;