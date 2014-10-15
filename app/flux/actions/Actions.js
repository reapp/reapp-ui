var _ = require('lodash-node');
var C = require('../constants');
var Client = require('../client');
var ENV = require('../../ENV');

var preloaded;
var cache;

if (ENV.CLIENT) {
  // we may not be running isomorphically in dev
  preloaded = window.ROUTER_PROPS;
}

var Actions = {
  articleLoad() {
    if (ENV.CLIENT && preloaded)
      Actions.dispatchSuccess.call(this, preloaded);
    else if (cache)
      Actions.dispatchSuccess.call(this, cache);
    else {
      this.dispatch(C.LOAD_ARTICLES);

      Client.load(
        'https://hacker-news.firebaseio.com/v0/topstories.json',
        (articles) => Actions.getArticlesAndLoad.call(this, articles),
        (error) => this.dispatch(C.LOAD_ARTICLES_FAIL, {error: error})
      );
    }
  },

  getArticlesAndLoad(res) {
    var total = 10;
    var errors = [];
    var payload = [];
    var articles = _.first(res, total);
    var done = _.after(total, () => {
      if (errors.length)
        this.dispatch(C.LOAD_ARTICLES_FAIL, {error: errors});
      else {
        Actions.dispatchSuccess.call(this, {data: payload});
      }
    });

    _.each(articles, (article) => {
      Client.load(
        `https://hacker-news.firebaseio.com/v0/item/${article}.json`,
        (article) => payload.push(article) && done(),
        (error) => errors.push(error) && done()
      )
    });
  },

  dispatchSuccess(response) {
    this.dispatch(C.LOAD_ARTICLES_SUCCESS, response);
    cache = response;
  }
};

module.exports = Actions;