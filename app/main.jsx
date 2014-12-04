require('es-object-assign');

var React  = require('react');
var ReactStyle = require('react-style');
var Router = require('react-router');
var ResolveAllPromises = require('when/keys').all;
var Routes = require('./routes');
var UI = require('ui');
var ENV = require('./ENV');

// UI
require('./themes/appTheme');

React.initializeTouchEvents(true);

var fetchAllData = (routes, params) => {
  var promises = routes
    .filter(route => route.handler.fetchData)
    .reduce((promises, route) => {
      promises[route.name] = route.handler.fetchData(params);
      return promises;
    }, {});

  return ResolveAllPromises(promises);
};

var render = (Handler, data) => {
  React.render(<Handler data={data} />, document.getElementById('app'));
};

function renderSync() {
  Router.run(Routes, Router.HistoryLocation, (Handler, state) => {
    fetchAllData(state.routes, state.params).then(data => render(Handler, data));
  });
}

function renderAsync() {
  Router.run(Routes, Router.HistoryLocation, (Handler, state) => {
    render(Handler, state);
    fetchAllData(state.routes, state.params).then(data => {
      // only re-render if we fetched data
      if (Object.keys(data).length)
        render(Handler, data);
    });
  });
}

if (ENV.CLIENT) {
  // require('omniscient').debug(); // debug omniscient
  window.React = React;
  renderAsync();
  // renderSync();
}
else {
  // module.exports = RoutedApp;
  renderSync();
}