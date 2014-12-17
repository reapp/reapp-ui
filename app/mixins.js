var Component = require('component');
var Omniscient = require('omniscient');
var ReactRouter = require('react-router');
var Animated = require('ui/mixins/Animated');

module.exports = {
  global: [
    Animated,
    {
      shouldComponentUpdate(nextProps, nextState) {
        if (this.isAnimating())
          return true;
        else
          return Omniscient.shouldComponentUpdate(nextProps, nextState);
      }
    }
  ],
  shared: {
    'RouteState': ReactRouter.State,
    'RouteHandler': ReactRouter.RouteHandlerMixin,
    'Navigation': ReactRouter.Navigation,
  }
};