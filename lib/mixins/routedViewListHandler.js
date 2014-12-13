var { State, Navigation, RouteHandler } = require('react-router');

// completely optional mixin for viewlists
// works with react-router and gives some helper functions
// to help manage state

module.exports = function(opts) {
  var { depth } = opts;

  return {
    mixins: [
      State,
      RouteHandler,
      Navigation,
    ],

    handleViewEntered(i) {
      if (i === 0)
        this.goBack();
    },

    getScrollToStep() {
      return this.numRoutes() - 1;
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
        this.getRouteHandler(Object.assign(this.props, { key: subRouteKey }))
      );
    }
  };
};