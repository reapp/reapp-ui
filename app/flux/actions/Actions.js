var _ = require('lodash-node');
var debug = require('debug')('g:actions');
var invariant = require('react/lib/invariant');
var Client = require('../client');
var ENV = require('../../ENV');

var preloaded;
var cache = {};

var Dispatcher = {
  create(name, params, loader) {
    if (!loader) loader = params;

    invariant(name && loader && typeof loader == 'function',
      'Must provide a name and loader function');

    var hash = name + _.map(params, (h,k) => ""+h+k);
    var NAME = name.toUpperCase();
    debug('binding dispatchers %s %s', NAME, hash);
    var loading = Dispatcher.dispatchLoad.bind(this, NAME);
    var success = Dispatcher.dispatchSuccess.bind(this, hash, NAME);
    var fail = Dispatcher.dispatchFail.bind(this, hash, NAME);

    debug('loading %s', name);

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
    debug('success: %s, res: %s', name, res);
    this.dispatch(`LOAD_${name}_SUCCESS`, res);
    cache[hash] = res;
  },

  dispatchFail(hash, name, res) {
    debug('fail: %s, res: %s', name, res);
    this.dispatch(`LOAD_${name}_FAIL`, {error: res});
    cache[hash] = res;
  },

  dispatchLoad(name) {
    debug('loading: %s', name);
    this.dispatch(`LOAD_${name}`);
  }
};

var Actions = {
  articlesLoad() {
    var url = 'https://hacker-news.firebaseio.com/v0/topstories.json';
    Dispatcher.create.call(this, 'articles', (success, fail) => {
      Client.get(url,
        (articles) => getArticlesAndLoad(articles, success, fail),
        (error) => fail(error)
      );
    });
  },

  articleLoad(params) {
    var url = `https://hacker-news.firebaseio.com/v0/item/${params.id}.json`;
    Dispatcher.create.call(this, 'article', params, (success, fail) => {
      Client.get(url,
        (article) => success(article),
        (error) => fail(error)
      );
    });
  }
};

function getArticlesAndLoad(articles, success, fail) {
  var total = 10;
  var errors = [];
  var payload = [];

  var done = _.after(total, () => {
    errors.length ? fail(errors) : success(payload);
  });

  _.each(_.first(articles, total), (article) => {
    Client.get(`https://hacker-news.firebaseio.com/v0/item/${article}.json`,
      (article) => payload.push(article) && done(),
      (error) => errors.push(error) && done()
    );
  });
}

if (ENV.CLIENT) {
  // we may not be running isomorphically in dev
  preloaded = window.ROUTER_PROPS || {};
  window.flux = {
    cache: cache,
    actions: Actions
  };
}

module.exports = Actions;