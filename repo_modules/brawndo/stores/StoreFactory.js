var Fluxxor = require('fluxxor');

window.stores = [];

var Store = {
  name: name,
  emit: function() {},
  onLoading() {
    this.loading = true;
    this.emit('change');
  },
  getFlux() {
    return this.flux;
  }
};

function createStoreFactory(storeName, storeMixins, storeActions) {
  return function({ name, mixins, ...actions }) {
    var allMixins = [].concat(storeMixins || [], mixins || []);
    var allActions = [].concat(storeActions || [], actions || []);
    var store = createStore(name, allMixins, allActions);
    window.stores.push(store);
    return store;
  };
}

function createStore(name, mixins, actions) {
  var store = {};

  return createStoreWithMixins(mixins, mixinActions => {
    store.flux = Fluxxor.createStore({
      initialize() {
        store.emit = this.emit;

        var allActions = [].concat(
          actions,
          mixinActions.map(ma => ma.call(this, name))
        );

        console.log(allActions);

        this.bindActions(allActions);
      }
    });

    return Object.assign({}, Store, store);
  });
}

function createStoreWithMixins(mixins, storeFactory) {
  if (!mixins) return storeFactory();

  var mixinActions = [];
  var mixedProps = {};

  mixins.forEach(mixin => {
    if (!mixin) return;
    objectForEach(mixin, (key, val) => {
      if (key === 'initialize') {
        mixinActions.push(val);
        return;
      }

      if (mixedProps[key])
        mixedProps[key] = () => mixin[key] && mixedProps[key];
      else
        mixedProps[key] = mixin[key];
    });
  });

  var store = storeFactory(mixinActions);
  return store;
}

function objectForEach(object, cb) {
  Object.keys(object).forEach(key => {
    var val = object[key];
    cb(key, val);
  });
}

module.exports = createStoreFactory;