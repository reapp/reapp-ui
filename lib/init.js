require('es-object-assign');

var React = require('react');
var Component = require('component');
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
  return spec;
});

// createClass + stores decorator
Component.addDecorator(spec => {
  if (!spec.stores)
    return React.createClass(spec);

  var stores = spec.stores.map(store => Component.stores[`${store}Store`]);
  var statics = spec.statics;
  delete spec.statics;
  var Class = React.createClass(spec);

  return React.createClass({
    statics,
    // mixins: [Component.mixins.storeListener(stores)],
    render() {
      return <Class {...this.props} stores={stores} />;
    }
  });
});

// export to window
if (require('./env').CLIENT)
  window.Component = Component;