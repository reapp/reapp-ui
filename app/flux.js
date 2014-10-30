var Actions = require('./actions/Actions');
var { ListStore } = require('brawndo');

// Stores
var ArticlesStore = new ListStore('articles').getFlux();
var ArticleStore = require('./stores/ArticleStore');
var UserStore = require('./stores/UserStore');

console.log(ArticlesStore);

var Stores = {
  articles: new ArticlesStore(),
  article: new ArticleStore(),
  user: new UserStore(),
};

// Exports { Flux, FluxMixin, StoreWatchMixin, GetStores }
module.exports = { Actions, Stores };