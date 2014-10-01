var {
  Routes: RRoutes,
  Route: RRoute,
  DefaultRoute: RDefaultRoute } = require('react-router');
var React  = require('react');
var Layout = require('./components/layout');
var Agave = require('agave').enable('r');
var Routes = require('./routes');

var App = React.createClass({
  render() {
    return Layout(null, this.props.activeRouteHandler());
  }
});

var pages = {
  'Home': require('./pages/home'),
  'Viewer': require('./pages/viewer')
};

var AppRoutes = Routes.map(function(route) {
  if (route.name === 'main')
    return RDefaultRoute({ handler: pages[route.handler] });
  else
    return RRoute({
      name: route.name,
      handler: pages[route.handler]
    });
});

// Add the params
AppRoutes.unshift({ name: "app", path: "/", handler: App });

var routes = RRoutes({ location: "history" },
              RRoute.apply(this, AppRoutes));

// This should have built an object like so:
// <Routes location="history">
//   <Route name="app" path="/" handler={App}>
//     <DefaultRoute handler={DefaultHandler} />
//     <Route name="name" handler={Handler} />
//   </Route>
// </Routes>

module.exports = routes;