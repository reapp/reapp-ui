/** @jsx React.DOM */
var Router = require('react-router');
var App = require('./main');
var Home = require('./components/home');

var Routes = Router.Routes;
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var routes = (
  <Routes location="history">
    <Route name="app" path="/" handler={App}>
      <DefaultRoute handler={Home} />
    </Route>
  </Routes>
);

module.exports = routes;