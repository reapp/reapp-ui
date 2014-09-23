var React = require('react');
var Routes = require('../app/routes');
var ReactStyle = require('react-style');

ReactStyle.inject();

React.renderComponent(Routes, document.body);