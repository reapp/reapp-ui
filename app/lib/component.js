var Component = require('component');
var Omniscient = require('omniscient');
var { State, RouteHandlerMixin } = require('react-router');
var StoreListener = require('./mixins/StoreListener');

var globalMixins = [
  { shouldComponentUpdate: Omniscient.shouldComponentUpdate }
];

var sharedMixins = {
  'rr.State': State,
  'rr.RouteHandler': RouteHandlerMixin,
  'StoreListener': StoreListener,
};

// shared mixins
Component.addTransformer(spec => {
  if (spec.mixins)
    spec.mixins = spec.mixins.map(mixin =>
      (typeof mixin === 'string') ? sharedMixins[mixin] : mixin);

  return spec;
});

// global mixins
Component.addTransformer(spec => {
  spec.mixins = globalMixins.concat(spec.mixins);
  return spec;
});