var Component = require('component');
var { Promise } = require('when');
var Immutable = require('immutable');
var { ArticlesStore, HotArticlesStore } = require('../stores');
var Actions = require('../actions');
var API = require('./API');
var Reducer = require('./Reducer');

var loadedReducer = Reducer.bind(null, 'LOADED');
var page = 0;
var per = 10;

Actions.articlesHotLoad.listen(
  opts => API.get('topstories.json', opts)
    .then(res => HotArticlesStore(res) && res)
    .then(getArticles)
);

Actions.articlesHotRefresh.listen(
  () => Actions.articlesHotLoad({ nocache: true })
);

Actions.articlesHotLoadMore.listen(
  () => API.get('topstories.json')
    .then(getNextArticles)
    .then(res => Actions.articlesHotLoadMoreDone())
);

Actions.articleLoad.listen(
  id => API.get(`item/${id}.json`)
    .then(getAllKids)
    .then(loadedReducer)
    .then(insertArticle)
);

function insertArticle(res, rej) {
  if (res) {
    res.map(article => {
      ArticlesStore(ArticlesStore().set(article.get('id'), article));
    });
    return res;
  }
  else {
    throw new Error(rej);
  }
}

function getNextArticles(articles) {
  page = page + 1;
  return getArticles(articles);
}

function getArticles(articles) {
  var start = page * per;

  return Promise.all(
    articles.slice(start, start + per).map(
      article => isObject(article) ? article :
        API.get(`item/${article}.json`)
          .then(Reducer)
          .then(insertArticle)
    ).toJS()
  );
}

function getAllKids(item) {
  item.closed = false;

  if (!item.kids)
    return new Promise(res => res(item));

  return Promise.all(
    item.kids.map(
      item => API.get(`item/${item}.json`).then(
        res => getAllKids(res)))
  )
  .then(res => {
    item.kids = res;
    item.kidsLoaded = true;
    return item;
  });
}

function error(err) {
  throw err;
}

function isObject(x) {
  return typeof x === 'object';
}