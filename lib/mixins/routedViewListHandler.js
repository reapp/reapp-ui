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
      scrollToStep: this.scrollToStep(),
      onViewEntered: this._handleViewEntered,
      disable: this.children && this.children.length <= 1 && this.scrollToStep() === 0
    };
  },

  scrollToStep() {
    return this.numActiveRoutes() - this.getRouteDepth();
  },

  routedSubRoute(props) {
    return this.hasChildRoute() && (
      this.getRouteHandler(Object.assign(this.props, { key: this.subRouteKey() }))
    );
  },

  // todo: debug why this is called more than it should be
  _handleViewEntered(i) {
    if (i === 0 && this.numActiveRoutes() > this.getRouteDepth())
      setTimeout(this.goBack, 1);
  },

  numActiveRoutes() {
    return this.getRoutes().length;
  },

  hasChildRoute() {
    return this.numActiveRoutes() > this.getRouteDepth();
  },

  subRouteKey() {
    return this.getRoutes().reverse()[0].name + this.getParams().id;
  }
};