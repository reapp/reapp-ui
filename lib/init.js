require('es-object-assign');

var React = require('react/addons');
var Component = require('../app/component');

Component.addStatics('helpers', require('./helpers/helpers'));
Component.addStatics('mixins', require('./mixins/mixins'));

// exports to window
if (require('./env').CLIENT) {
  window.Component = Component;
  window.React = React;
}