var _ = require('lodash-node');
var invariant = require('react/lib/invariant');
var { Promise } = require('when');
var Client = require('../client');
var Dispatcher = require('../lib/Dispatcher');

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
        (article) => getCommentsAndLoad(article, success, fail),
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

function getArticlesAndLoad(articles, success, fail) {
  Promise
    .all(_.map(_.first(articles, 10),
      (article) => Client.get(`https://hacker-news.firebaseio.com/v0/item/${article}.json`)
    ))
    .then((res) => success(res));
}

function getCommentsAndLoad(article, success, fail) {
  getAllKids(article).done((res) => success(res));
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