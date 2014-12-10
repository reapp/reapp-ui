require('es-object-assign');

var React = require('react/addons');
var Component = require('../app/component');
var Env = require('./env');

Component.addStatics('helpers', require('./helpers/helpers'));
Component.addStatics('mixins', require('./mixins/mixins'));

// exports to window
if (Env.CLIENT) {
  window.Component = Component;
  window.React = React;

  if (Env.PRODUCTION)
    require('raf-batching');
}