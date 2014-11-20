var Actions = require('./Actions');
var API = require('./API');
var Reducer = require('./Reducer');
var ArticlesStore = require('stores/ArticlesStore');

Actions.loadArticlesHot.listen(() => {
  console.log('loading articles hot');
  return API.get('topstories.json')
    .then(getArticlesData)
    .then(Reducer)
    .then(ArticlesStore, error);
});

Actions.loadArticle.listen(id => {
  API.get(`item/${id}.json`)
    .then(getAllKids)
    .then(ArticlesStore().set.bind(this, id), error);
});

function getArticlesData(articles) {
  return Promise.all(
    articles.slice(0, 9).map(article => API.get(`item/${article}.json`))
  );
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
    return item;
  });
}

function error(err) {
  throw err;
}