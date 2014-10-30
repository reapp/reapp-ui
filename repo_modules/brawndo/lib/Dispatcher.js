var _ = require('lodash-node');
var invariant = require('react/lib/invariant');
var debug = require('debug')('g:flux:dispatcher');

var preloaded;
var cache = {};

var Dispatcher = {
  create(name, params, loader) {
    if (!loader) loader = params;

    invariant(name && loader && typeof loader == 'function',
      'Must provide a name and loader function');

    var hash = name + _.map(params, (h,k) => ""+h+k);

    var loading = Dispatcher.dispatchLoad.bind(this, name);
    var success = Dispatcher.dispatchSuccess.bind(this, hash, name);
    var fail = Dispatcher.dispatchFail.bind(this, hash, name);

    if (cache[hash])
      success(cache[hash]);
    else if (ENV.CLIENT && preloaded[name]) {
      success(preloaded[name][name]); // hacky, its because name == root, and name == root data
    }
    else {
      loading();
      loader(success, fail);
    }
  },

  dispatchSuccess(hash, name, res) {
    this.dispatch(`LOAD_${name}_SUCCESS`, res);
    cache[hash] = res;
  },

  dispatchFail(hash, name, res) {
    this.dispatch(`LOAD_${name}_FAIL`, {error: res});
    cache[hash] = res;
  },

  dispatchLoad(name) {
    this.dispatch(`LOAD_${name}`);
  }
};

if (typeof window !== 'undefined') {
  // we may not be running isomorphically in dev
  preloaded = window.ROUTER_PROPS || {};
  window.flux = window.flux || {};
  window.flux.cache = cache;
}

module.exports = Dispatcher;