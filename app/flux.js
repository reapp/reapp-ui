var React = require('react');
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var FluxChildMixin = Fluxxor.FluxChildMixin(React);
var FluxxorAutobind = require('fluxxor-autobind');

// Stores
var TimeStore = require('./stores/TimeStore');

var stores = {
  timeStore: new TimeStore()
};

var Flux = new Fluxxor.Flux(stores, {});
FluxxorAutobind.install(Flux);

module.exports = {
  FluxMixin: FluxMixin,
  FluxChildMixin: FluxChildMixin,
  Flux: Flux
};