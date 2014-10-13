var C = require('./Constants');
var Client = require('./Client');
var _ = require('lodash-node');

var Actions = {
  articleLoad() {
    this.dispatch(C.LOAD_ARTICLES);

    Client.load(
      'https://hacker-news.firebaseio.com/v0/topstories.json',
      (articles) => Actions.getArticlesAndLoad.call(this, articles),
      (error) => this.dispatch(C.LOAD_ARTICLES_FAIL, {error: error})
    );
  },

  getArticlesAndLoad(res) {
    var total = 10;
    var errors = [];
    var payload = [];
    var articles = _.first(res, total);

    var done = _.after(total, () => {
      if (errors.length)
        this.dispatch(C.LOAD_ARTICLES_FAIL, {error: errors});
      else
        this.dispatch(C.LOAD_ARTICLES_SUCCESS, {data: payload});
    });

    _.each(articles, (article) => {
      Client.load(
        `https://hacker-news.firebaseio.com/v0/item/${article}.json`,
        (article) => payload.push(article) && done(),
        (error) => errors.push(error) && done()
      )
    });
  }
};

module.exports = Actions;