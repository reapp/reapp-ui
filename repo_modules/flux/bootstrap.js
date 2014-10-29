var React = require('react');
var Fluxxor = require('fluxxor');
var _ = require('lodash-node');
var debug = require('debug')('g:flux');
var Actions = require('./actions/Actions');
var GetStores = require('./lib/GetStores');

var ENV = {
  CLIENT: typeof window !== 'undefined',
  SERVER: typeof window === 'undefined'
};

// Stores
var ArticlesStore = require('./stores/ArticlesStore');
var ArticleStore = require('./stores/ArticleStore');
var UserStore = require('./stores/UserStore');

var Stores = {
  articles: new ArticlesStore(),
  article: new ArticleStore(),
  user: new UserStore(),
};

var Flux = new Fluxxor.Flux(Stores, Actions);

if (ENV.CLIENT) {
  window.stores = Stores;
  Flux.on('dispatch', function(type, payload) {
    debug(type, payload);
  });

  window.flux = window.flux || {};
  window.flux.Actions = Actions;
}

module.exports = {
  StoreWatchMixin: Fluxxor.StoreWatchMixin,
  FluxMixin: Fluxxor.FluxMixin(React),
  Flux: Flux,
  GetStores: GetStores.init(Flux)
};