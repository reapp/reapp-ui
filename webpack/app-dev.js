var React = require('react');
var App = require('../app/main');

global.GSS.once('afterLoaded', function() {
  React.renderComponent(App, document.body);
});