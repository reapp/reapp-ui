// until React 0.14, we emulate the context

import { normalize, normalizeAll } from './lib/normalizeStyles';
import _ from 'lodash';

require('./lib/desktopTouch');
require('reapp-object-assign');

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

  getTheme() {
    return {
      styles: this.styles,
      animations: this.animations,
      constants: this.constants
    };
  },

  // constants are order sensitive and are overwritten on object
  addConstants(...constants) {
    constants.forEach(constant => {
      // allow functions, we pass in current constants
      if (typeof constant === 'function')
        constant = constant(UI.constants);

      Object.assign(UI.constants, constant);
    });
  },

  // simply unions a list of animations objects
  addAnimations(...animations) {
    animations.forEach(animation => {
      Object.keys(animation).forEach(key => {
        UI.animations[key] = animation[key];
      });
    });
  },

  // styles are order sensitive and pushed onto array
  addStyles(...styles) {
    styles.forEach(style => {
      // style: { styles: { key: requireFunc }, (include: [] | exclude: []) }
      var { styles, include, exclude } = style.styles ? style : { styles: style };
      var styleKeys = Object.keys(styles);
      if (include && exclude)
        throw new Error('Cannot define include and exclude');

      // include or exclude certain styles
      UI._addStyles(styles,
        include && include.length ?
          styleKeys.filter(x => include.indexOf(x) !== -1) :
          exclude && exclude.length ?
            styleKeys.filter(x => exclude.indexOf(x) === -1) :
            styleKeys
      );
    });
  },

  // do the actual adding
  // styles: { name: requireFunc }
  _addStyles(styles, keys) {
    var requireFunc = styles.__requireFunc;

    // Load the requireFunc for our custom styles
    if(requireFunc) {
      // Remove function and keys
      delete styles.__requireFunc;
      var ind = keys.indexOf("__requireFunc");
      keys.splice(ind, 1);
    }

    keys.forEach(key => {
      var style;

      // If there are external styles to require, load them
      // else load the styles from the theme
      if(requireFunc)
        style = requireFunc(key);
      else
        style = styles[key];
      
      if (typeof style === 'function'){
        style = style(UI.constants);
      }
      if (!UI.styles[key]) {
        UI.styles[key] = normalizeAll(style)
      }
      else {
        Object.keys(style).forEach(ref => {
          UI.styles[key][ref] = [].concat(UI.styles[key][ref], normalize(style[ref]));
          if (Array.isArray(UI.styles[key][ref])) {
            UI.styles[key][ref] = Object.assign(...UI.styles[key][ref]);
          }
        });
      }
    });
  },

  // we just store key: true and __requireFunc: function
  // so webpack can conditionally require styles later
  makeStyles(requireFunc, components) {
    var styles = {};
    styles.__requireFunc = requireFunc;

    components.forEach(key => {
      styles[key] = true;
    });

    return styles;
  }
};