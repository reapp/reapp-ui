// Decoration for every component used internally in reapp-ui

'use strict';

var Component = require('reapp-component')();
var React = require('react');
var Radium = require('radium');
var Styled = require('./mixins/Styled');
var Classed = require('./mixins/Classed');
var Constanted = require('./mixins/Constanted');
var Animated = require('./mixins/Animated');
var ComponentProps = require('./mixins/ComponentProps');

Component.addDecorator(function (spec) {

  Object.assign(spec, ComponentProps, Constanted);

  // add context for theme
  spec.contextTypes = {
    theme: React.PropTypes.object,
    animations: React.PropTypes.object
  };

  // mixins
  spec.mixins = [].concat(Classed, Styled, Animated, spec.mixins || []);

  // add UI displayname to help with debugging
  spec.displayName = spec.name;

  // wrap in createClass
  return Radium(React.createClass(spec));
});

module.exports = Component;
