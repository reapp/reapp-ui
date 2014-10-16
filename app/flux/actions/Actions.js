var _ = require('lodash-node');
var Client = require('../client');
var ENV = require('../../ENV');
var debug = require('debug')('actions');

var preloaded;
var cache = {};

if (ENV.CLIENT) {
  // we may not be running isomorphically in dev
  preloaded = window.ROUTER_PROPS || {};
}

var util = {
  createDispatcher(key, loadCallback) {
    var success = util._dispatchSuccess.bind(this, key);
    var fail = util._dispatchFail.bind(this, key);

    if (ENV.CLIENT && preloaded[key]) {
      debug('loading %s with preload', key);
      success(preloaded[key]);
    }
    else if (cache[key]) {
      debug('loading %s with cache', key);
      success(cache[key]);
    }
    else {
      debug('loading %s with request', key);;
      util._dispatchLoad.call(this, key);
      loadCallback(success, fail);
    }
  },

  _dispatchSuccess(key, res) {
    debug('success %s %s', key, res);
    this.dispatch(`LOAD_${key}_SUCCESS`, {data: res});
    cache[key] = res;
  },

  _dispatchFail(key, res) {
    this.dispatch(`LOAD_${key}_FAIL`, {error: res});
    cache[key] = res;
  },

  _dispatchLoad(key) {
    this.dispatch(`LOAD_${key}`);
  }
};

var Actions = {
  articlesLoad() {
    util.createDispatcher.call(this, 'ARTICLES', function(success, fail) {
      Client.load(
        'https://hacker-news.firebaseio.com/v0/topstories.json',
        (articles) => getArticlesAndLoad(articles, success, fail),
        (error) => fail(error)
      );

      function getArticlesAndLoad(articles, success, fail) {
        var total = 10;
        var errors = [];
        var payload = [];

        var done = _.after(total, () => {
          errors.length ? fail(errors) : success(payload);
        });

        _.each(_.first(articles, total), (article) => {
          Client.load(
            `https://hacker-news.firebaseio.com/v0/item/${article}.json`,
            (article) => payload.push(article) && done(),
            (error) => errors.push(error) && done()
          )
        });
      }
    });
  },

  articleLoad(params) {
    util.createDispatcher.call(this, 'ARTICLE', function(success, fail) {
      Client.load(
        `https://hacker-news.firebaseio.com/v0/item/${params.id}.json`,
        (article) => success(article),
        (error) => fail(error)
      );
    });
  }
};

module.exports = Actions;