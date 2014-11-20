require('es-object-assign');

var React  = require('react');
var ReactStyle = require('react-style');
var Router = require('react-router');
var WhenKeys = require('when/keys');
var Routes = require('./routes');
var UI = require('ui');
var IOSTheme = require('ui/themes/ios');
var ENV = require('./ENV');

// UI
UI.setTheme(IOSTheme);

ReactStyle.inject();
React.initializeTouchEvents(true);

var fetchData = (routes, params) => WhenKeys.all(
  routes
    .filter(route => route.handler.fetchData)
    .reduce((data, route) => {
      data[route.name] = route.handler.fetchData(params);
      return data;
    }, {})
);

var render = (Handler, data) =>
  React.render(<Handler data={data} />, document.getElementById('app'));

function renderSync() {
  Router.run(Routes, Router.HistoryLocation, (Handler, state) => {
    fetchData(state.routes, state.params).then(data => render(Handler, data));
  });
}

function renderAsync() {
  Router.run(Routes, (Handler, state) => {
    render(Handler, state);
    // renderSync();
  });
}

if (ENV.CLIENT) {
  // require('omniscient').debug(); // debug omniscient
  window.React = React;
  // renderAsync();
  renderSync();
}
else {
  // module.exports = RoutedApp;
  renderSync();
}