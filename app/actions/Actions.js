var { Client, Dispatcher } = require('brawndo');
var _ = require('lodash-node');
var invariant = require('react/lib/invariant');
var { Promise } = require('when');

var Actions = {
  articlesLoad() {
    var url = 'https://hacker-news.firebaseio.com/v0/topstories.json';
    Dispatcher.create.call(this, 'articles', (success, fail) => {
      Client.get(url,
        (articles) => callbackFromPromise(getArticles(articles), success, fail),
        (error) => fail(error)
      );
    });
  },

  articleLoad(params) {
    var url = `https://hacker-news.firebaseio.com/v0/item/${params.id}.json`;
    Dispatcher.create.call(this, 'article', params, (success, fail) => {
      Client.get(url,
        (article) => callbackFromPromise(getComments(article), success, fail),
        (error) => fail(error)
      );
    });
  },

  userLoad(params) {
    var url = `https://hacker-news.firebaseio.com/v0/user/${params.id}.json`;
    Dispatcher.create.call(this, 'user', params, (success, fail) => {
      Client.get(url,
        (user) => success(user),
        (error) => fail(error)
      );
    });
  }
};

function callbackFromPromise(promise, success, fail) {
  promise.then(res => success(res));
  // todo: fail
}

function getArticles(articles) {
  return Promise.all(_.map(_.first(articles, 10),
    article => Client.get(`https://hacker-news.firebaseio.com/v0/item/${article}.json`)
  ));
}

function getComments(article) {
  return getAllKids(article);
}

function getAllKids(item) {
  item.closed = false;

  if (!item.kids) {
    return new Promise(res => res(item));
  }
  else {
    return Promise
      .all(
        item.kids.map(item => Client
        .get(`https://hacker-news.firebaseio.com/v0/item/${item}.json`)
        .then(res => getAllKids(res)))
      )
      .then(res => {
        item.kids = res;
        return item;
      });
  }
}

module.exports = Actions;