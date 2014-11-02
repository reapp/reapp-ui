var _ = require('lodash-node');
var { Promise } = require('when');
var API = require('./API');

var PageActions = module.exports = {
  articles: getArticles,
  article: getArticle,
  user: getUser
};

function getArticles() {
  return API.get('topstories.json')
    .then(
      res => getArticlesData(res),
      err => err
    );
}

function getArticlesData(articles) {
  return Promise.all(_.map(_.first(articles, 10),
    article => API.get(`item/${article}.json`)
  ));
}

function getArticle(params) {
  return API.get(`item/${params.id}.json`)
    .then(
      res => getAllKids(res),
      err => err
    );
}

function getAllKids(item) {
  item.closed = false;

  if (!item.kids) {
    return new Promise(res => res(item));
  }
  else {
    return Promise
      .all(item.kids.map(item =>
        API
          .get(`item/${item}.json`)
          .then(res => getAllKids(res)))
      )
      .then(res => {
        item.kids = res;
        return item;
      });
  }
}

function getUser(params) {
  return API.get(`user/${params.id}.json`);
}