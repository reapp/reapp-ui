var Component = require('component');
var { Promise } = require('when');
var Immutable = require('immutable');
var { ArticlesStore, HotArticlesStore } = require('../stores');
var Actions = require('../actions');
var API = require('./API');
var Reducer = require('./Reducer');

var page = 0;
var per = 10;

Actions.articlesHotLoad.listen(
  (opts) => API.get('topstories.json', opts)
    .then(res => HotArticlesStore(res) && res)
    .then(getArticles)
);

Actions.articlesHotRefresh.listen(
  () => Actions.articlesHotLoad({ nocache: true })
);

Actions.articlesHotLoadMore.listen(
  () =>  API.get('topstories.json')
    .then(getNextArticles)
    .then(Reducer)
    .then(nextArticles => {
      ArticlesStore().withMutations(articles => {
        Object.keys(nextArticles).map(key => {
          articles.set(key, Immutable.fromJS(nextArticles[key]));
        });
      });
    })
);

Actions.articleLoad.listen(
  id => API.get(`item/${id}.json`)
    .then(getAllKids)
    .then(
      res => {
        ArticlesStore().withMutations(articles => {
          articles.set(id, Immutable.fromJS(Reducer('LOADED', res)[id]));
        });
      },
      error
    )
);

function cacheArticles(list) {
  articles = list;
}

function getNextArticles(articles) {
  page = page + 1;
  return getArticles(articles);
}

function getArticles(articles) {
  var start = page * per;

  articles.slice(start, start + per).map(article => {
    return typeof article == 'object' ? article :
      API.get(`item/${article}.json`)
        .then(res => ArticlesStore().withMutations(articles => {
          articles.set(''+res.id, Immutable.fromJS(Reducer(res)[res.id]));
        }));
  });
}

function getAllKids(item) {
  item.closed = false;

  if (!item.kids)
    return new Promise(res => res(item));

  return Promise.all(
    item.kids.map(item =>
      API.get(`item/${item}.json`).then(res => getAllKids(res)))
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