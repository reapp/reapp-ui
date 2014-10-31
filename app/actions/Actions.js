var _ = require('lodash-node');
var { Promise } = require('when');
var Client = require('client');

Client.setBase('https://hacker-news.firebaseio.com/v0/');

var Actions = module.exports = {
  articlesLoad: () => Client.get('topstories.json').then(
    res => getArticles(res),
    err => err
  ),

  articleLoad: params => Client.get(`item/${params.id}.json`).then(
    res => getAllKids(res),
    err => err
  ),

  userLoad: params => Client.get(`user/${params.id}.json`)
};

function getArticles(articles) {
  return Promise.all(_.map(_.first(articles, 10),
    article => Client.get(`https://hacker-news.firebaseio.com/v0/item/${article}.json`)
  ));
}

function getAllKids(item) {
  item.closed = false;

  if (!item.kids) {
    return new Promise(res => res(item));
  }
  else {
    return Promise
      .all(item.kids.map(item =>
        Client
          .get(`https://hacker-news.firebaseio.com/v0/item/${item}.json`)
          .then(res => getAllKids(res)))
      )
      .then(res => {
        item.kids = res;
        return item;
      });
  }
}