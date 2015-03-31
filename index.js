// until React 0.14, we emulate the context
"use strict";

require("./lib/contextPatch");

var Stylesheet = require("react-style");
var Invariant = require("react/lib/invariant");

require("./lib/desktopTouch");
require("reapp-object-assign");

if (window._FORCE_ENABLE_RAF || window.process && process.env && process.env.NODE_ENV === "production") require("reapp-raf-batching");

// Stores constants, animations and styles
//   see themes/ios/all.js for an example usage.

// Constants should be added before styles, they are
// passed into any styles file that returns a function.
// You can load multiple constants files, so if you'd
// like load the iOS theme, then override a few constants

// Styles are one big object, with each key mapping to a
// component/view's name. The values of those keys map
// to the refs within each component, and finally those
// values map to objects with styles.

// Styles compiled to ReactStyle objects on init.
// You can also load multiple styles objects, and order
// determines winner (last in applies).

// Finally, animations are an object. Their keys map to
// functions that take in (index, step, props).

var UI = module.exports = {
  styles: {},
  animations: {},
  constants: {},

  getTheme: function getTheme() {
    return {
      styles: this.styles,
      animations: this.animations,
      constants: this.constants
    };
  },

  // constants are order sensitive and are overwritten on object
  addConstants: function addConstants() {
    for (var _len = arguments.length, constants = Array(_len), _key = 0; _key < _len; _key++) {
      constants[_key] = arguments[_key];
    }

    constants.forEach(function (constant) {
      // allow functions, we pass in current constants
      if (typeof constant === "function") constant = constant(UI.constants);

      Object.assign(UI.constants, constant);
    });
  },

  // simply unions a list of animations objects
  addAnimations: function addAnimations() {
    for (var _len = arguments.length, animations = Array(_len), _key = 0; _key < _len; _key++) {
      animations[_key] = arguments[_key];
    }

    animations.forEach(function (animation) {
      Object.keys(animation).forEach(function (key) {
        UI.animations[key] = animation[key];
      });
    });
  },

  // styles are order sensitive and pushed onto array
  addStyles: function addStyles() {
    for (var _len = arguments.length, styles = Array(_len), _key = 0; _key < _len; _key++) {
      styles[_key] = arguments[_key];
    }

    styles.forEach(function (style) {
      // style: { styles: { key: requireFunc }, (include: [] | exclude: []) }

      var _ref = style.styles ? style : { styles: style };

      var styles = _ref.styles;
      var include = _ref.include;
      var exclude = _ref.exclude;

      var requireFunc = styles.__requireFunc;
      delete styles.__requireFunc;
      var styleKeys = Object.keys(styles);

      Invariant(!(include && exclude), "Cannot define include and exclude");

      // include or exclude certain styles
      UI._addStyles(requireFunc, include && include.length ? styleKeys.filter(function (x) {
        return include.indexOf(x) !== -1;
      }) : exclude && exclude.length ? styleKeys.filter(function (x) {
        return exclude.indexOf(x) === -1;
      }) : styleKeys);
    });
  },

  // do the actual adding
  // styles: { name: requireFunc }
  _addStyles: function _addStyles(requireFunc, styles) {
    styles.forEach(function (key) {
      var style = requireFunc(key);
      if (typeof style === "function") style = style(UI.constants);

      if (!UI.styles[key]) UI.styles[key] = Stylesheet.create(style);else Object.keys(style).forEach(function (ref) {
        UI.styles[key][ref] = [].concat(UI.styles[key][ref], style[ref]);
      });
    });
  },

  // we just store key: true and __requireFunc: function
  // so webpack can conditionally require styles later
  makeStyles: function makeStyles(requireFunc, components) {
    var styles = {};
    styles.__requireFunc = requireFunc;

    components.forEach(function (key) {
      styles[key] = true;
    });

    return styles;
  }
};