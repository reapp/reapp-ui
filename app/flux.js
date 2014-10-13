var React = require('react');
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var FluxChildMixin = Fluxxor.FluxChildMixin(React);
var FluxxorAutobind = require('fluxxor-autobind');
var Actions = require('./stores/Actions');

// Stores
var ArticleStore = require('./stores/ArticleStore');

var stores = {
  articleStore: new ArticleStore()
};

var Flux = new Fluxxor.Flux(stores, Actions);
FluxxorAutobind.install(Flux);

module.exports = {
  FluxMixin: FluxMixin,
  FluxChildMixin: FluxChildMixin,
  Flux: Flux
};