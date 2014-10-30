var Actions = require('./actions/Actions');
var { ListStore } = require('brawndo');

// Stores
var ArticlesStore = require('./stores/ArticlesStore');
var ArticleStore = require('./stores/ArticleStore');
var UserStore = require('./stores/UserStore');

var Stores = {
  articles: new ArticlesStore(),
  article: new ArticleStore(),
  user: new UserStore(),
};

// Exports { Flux, FluxMixin, StoreWatchMixin, GetStores }
module.exports = { Actions, Stores };