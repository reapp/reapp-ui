var Component = require('component');
var { Promise } = require('bluebird');
var { ArticlesStore, HotArticlesStore } = require('../stores');
var Actions = require('../actions');
var API = require('./API');
var Reducer = require('./Reducer');
var Immutable = require('immutable');

var loadedReducer = Reducer.bind(null, 'LOADED');
var page = 0;
var per = 10;

Actions.articlesHotLoad.listen(
  opts => {
    var hasHotArticles = HotArticlesStore().count();
    if (opts && !opts.nocache && hasHotArticles || !opts && hasHotArticles)
      Actions.articlesHotLoadDone();
    else
      API.get('topstories.json', opts)
        .then(res => HotArticlesStore(res) && res)
        .then(getArticles)
        .then(Actions.articlesHotLoadDone);
  }
);

Actions.articlesHotLoadMore.listen(
  () =>
    API.get('topstories.json')
      .then(getNextArticles)
      .then(Actions.articlesHotLoadMoreDone)
);

Actions.articleLoad.listen(
  params => {
    var id = Number(params.id);
    var article = ArticlesStore().get(id);

    if (article && article.get('status') === 'LOADED')
      Actions.articleLoadDone(id);
    else
      API.get(`item/${id}.json`)
        .then(getAllKids)
        .then(loadedReducer)
        .then(insertArticle)
        .then(Actions.articleLoadDone.bind(this, id));
  }
);

function insertArticle(res, rej) {
  if (rej) error(rej);
  if (res) {
    res.map(article => {
      ArticlesStore().set(article.id, Immutable.fromJS(article));
    });
    return res;
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
    )
  );
}

function getAllKids(item) {
  var kids = item.kids;
  item.closed = false;

  if (!kids)
    return new Promise(res => res(item));

  return Promise.all(
    kids.map(item => API.get(`item/${item}.json`).then(getAllKids))
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