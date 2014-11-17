require('es-object-assign');

var React  = require('react');
var ReactStyle = require('react-style');
var Router = require('react-router');
var Brawndo = require('brawndo');
var WhenKeys = require('when/keys');
var Routes = require('./routes');
var ENV = require('./ENV');

// Flux
require('./stores/Stores');
require('./actions/Actions');
var Flux = Brawndo.init(React);

ReactStyle.inject();
React.initializeTouchEvents(true);

var fetchData = (matches, params) =>
  WhenKeys.all(
    matches
      .filter(match => match.route.handler.fetchData)
      .reduce((data, match) => {
        var {name, handler} = match.route;
        data[name] = handler.fetchData(params);
        return data;
      }, {}));

var render = (Handler, data) =>
  React.render(<Handler data={data} flux={Flux} />, document.getElementById('app'))

function renderSync() {
  Router.run(Routes, (Handler, state) => {
    fetchData(state.matches, state.activeParams).then(data => render(Handler, data));
  });
}

function renderAsync() {
  Router.run(Routes, (Handler, state) => {
    render(Handler, state);
    renderSync(Handler, state);
  });
}

if (ENV.CLIENT) {
  // require('omniscient').debug(); // debug omniscient
  window.React = React;
  renderAsync();
}
else {
  // module.exports = RoutedApp;
  renderSync();
}