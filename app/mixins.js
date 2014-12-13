var Component = require('component');
var Omniscient = require('omniscient');
var ReactRouter = require('react-router');

module.exports = {
  global: [
    // { shouldComponentUpdate: Omniscient.shouldComponentUpdate }
  ],
  shared: {
    'RouteState': ReactRouter.State,
    'RouteHandler': ReactRouter.RouteHandlerMixin,
  }
};