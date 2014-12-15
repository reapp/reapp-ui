var { State, Navigation, RouteHandlerMixin } = require('react-router');

// mixin for viewlists
// works with react-router and gives some helper functions
// to manage viewLists

module.exports = {
  mixins: [
    State,
    RouteHandlerMixin,
    Navigation,
  ],

  routedViewListProps() {
    return {
      scrollToStep: this.numRoutes() - this.getRouteDepth(),
      onViewEntered: this._handleViewEntered
    };
  },

  routedSubRoute(props) {
    return this.hasChildRoute() && (
      this.getRouteHandler(Object.assign(this.props, { key: this.subRouteKey() }))
    );
  },

  // todo: debug why this is called more than it should be
  _handleViewEntered(i) {
    if (i === 0 && this.numRoutes() > this.getRouteDepth())
      setTimeout(this.goBack, 1);
  },

  numRoutes() {
    return this.getRoutes().length;
  },

  hasChildRoute() {
    return this.numRoutes() > this.getRouteDepth();
  },

  subRouteKey() {
    return this.getRoutes().reverse()[0].name + this.getParams().id;
  }
};