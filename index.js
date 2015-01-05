var ReactStyle = require('react-style');
var Invariant = require('react/lib/invariant');

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


module.exports = {
  styles: {},
  animations: {},
  constants: {},

  constantsHelpers: {
    _toRGB(hex) {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      Invariant(result, `Could not convert hex ${hex} to rgb`);
      return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
    }
  },

  setup(type, obj) {
    switch(type) {
    case 'constants':
      this.addConstants(obj);
      break;
    case 'animations':
      this.addAnimation(obj);
      break;
    case 'styles':
      this.addStyles(obj);
      break;
    }
  },

  // constants are order sensitive and are overwritten on object
  addConstants(constantObj) {
    Object.keys(constantObj).forEach(key => {
      this.constants[key] = constantObj[key];
    });

    Object.assign(this.constants, this.constantsHelpers);
  },

  addAnimation(animationObj) {
    Object.keys(animationObj).forEach(key => {
      this.animations[key] = animationObj[key];
    });
  },

  // styles are order sensitive and pushed onto array
  // style: { styles: { key: requireFunc }, (include: [] | exclude: []) }
  addStyles(style) {
    var { styles, include, exclude } = style.styles ? style : { styles: style };
    var requireFunc = styles.__requireFunc;
    delete styles.__requireFunc;
    var styleKeys = Object.keys(styles);

    Invariant(!(include && exclude),
      'Cannot define include and exclude');

    // include or exclude certain styles
    this._addStyles(requireFunc,
      include && include.length ?
        styleKeys.filter(x => include.indexOf(x) !== -1) :
        exclude && exclude.length ?
          styleKeys.filter(x => exclude.indexOf(x) === -1) :
          styleKeys
    );
  },

  // do the actual adding
  // styles: { name: requireFunc }
  _addStyles(requireFunc, styles) {
    styles.forEach(key => {
      var style = requireFunc(key);
      if (typeof style === 'function')
        style = style(this.constants);

      // make into ReactStyle
      Object.keys(style).forEach(styleKey => {
        this.styles[key] = (this.styles[key] || {});
        this.styles[key][styleKey] = (this.styles[key][styleKey] || [])
          .concat(ReactStyle(style[styleKey]));
      });
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
  },

  getStyles(name) {
    return name ? this.styles[name] : this.styles;
  },

  getConstants(name) {
    return name ? this.constants[name] : this.constants;
  },

  getAnimations(name) {
    return name ? this.animations[name] : this.animations;
  }
};