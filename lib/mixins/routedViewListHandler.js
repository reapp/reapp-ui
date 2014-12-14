var { State, Navigation, RouteHandlerMixin } = require('react-router');

// mixin for viewlists
// works with react-router and gives some helper functions

module.exports = function(opts) {
  var { depth } = opts;

  return {
    mixins: [
      State,
      RouteHandlerMixin,
      Navigation,
    ],

    // todo: debug why this is called more than it should be
    handleViewEntered(i) {
      if (i === 0 && this.numRoutes() > depth)
        this.goBack();
    },

    getScrollToStep() {
      return this.numRoutes() - 2;
    },

    getViewListProps() {
      return {
        scrollToStep: this.getScrollToStep(),
        onViewEntered: this.handleViewEntered
      };
    },

    numRoutes() {
      return this.getRoutes().length;
    },

    getDepth() {
      return depth;
    },

    hasChildRoute() {
      return this.numRoutes() > depth;
    },

    subRouteKey() {
      return this.getRoutes().reverse()[0].name + this.getParams().id;
    },

    getKeyedSubRoute(props) {
      return this.hasChildRoute() && (
        this.getRouteHandler(Object.assign(this.props, { key: this.subRouteKey() }))
      );
    }
  };
};