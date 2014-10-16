var _ = require('lodash-node');
var debug = require('debug')('g:actions');
var invariant = require('react/lib/invariant');
var Client = require('../client');
var ENV = require('../../ENV');

var preloaded;
var cache = {};

if (ENV.CLIENT) {
  // we may not be running isomorphically in dev
  preloaded = window.ROUTER_PROPS || {};
}

var Dispatcher = {
  create(key, params, loader) {
    if (!loader) loader = params;

    invariant(key && loader && typeof loader == 'function',
      'Must provide a key and loader function');

    var actionKey = key.toUpperCase();
    var loading = Dispatcher.dispatchLoad.bind(this, actionKey);
    var success = Dispatcher.dispatchSuccess.bind(this, actionKey);
    var fail = Dispatcher.dispatchFail.bind(this, actionKey);

    debug('loading %s', key);

    if (cache[actionKey])
      success(cache[actionKey]);
    else if (ENV.CLIENT && preloaded[key]) {
      success(preloaded[key][key]); // hacky, its because key == root, and key == root data
    }
    else {
      loading();
      loader(success, fail);
    }
  },

  dispatchSuccess(key, res) {
    debug('success key: %s, res: %s', key, res);
    this.dispatch(`LOAD_${key}_SUCCESS`, {data: res});
    cache[key] = res;
  },

  dispatchFail(key, res) {
    debug('fail key: %s, res: %s', key, res);
    this.dispatch(`LOAD_${key}_FAIL`, {error: res});
    cache[key] = res;
  },

  dispatchLoad(key) {
    this.dispatch(`LOAD_${key}`);
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

module.exports = Actions;