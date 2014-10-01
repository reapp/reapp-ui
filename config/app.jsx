var React = require('react');
var App = require('../app/main');
var ReactStyle = require('react-style');

ReactStyle.inject();

React.renderComponent(App, document.body);