var invariant = require('react/lib/invariant');

module.exports = {
  theme: {},
  constants: {},

  setup(opts) {
    var { constants, themes } = opts;

    constants.forEach(constantObj => this.addConstants);
    themes.forEach(themeObj => this.addTheme);
  },

  // constants are order sensitive and are overwritten
  addConstants(constantObj) {
    Object.keys(constantObj).forEach(key => {
      this.constants[key] = constantObj[key];
    });
  },

  // themes are order sensitive and pushed onto array
  addTheme(theme) {
    var { styles, include, exclude } = theme;
    invariant(!(include && exlcude), 'Cannot define include and exclude');

    var styleKeys = Object.keys(styles);

    var includedStyleKeys = include ?
      styleKeys.filter(x => include.indexOf(x.key) !== -1) :
      exclude ?
        styleKeys.filter(x => exclude.indexOf(x.key) === -1) :
        styleKeys;

    includedStyleKeys.forEach(key => {
      if (this.theme[key])
        this.theme[key].push(theme[key]);
      else
        this.theme[key] = [theme[key]];
    });
  },

  // we just store an object the lets us require the styles later if needed
  makeTheme(requireFunc, components) {
    var styles = {};

    components.forEach(key => {
      styles[key] = { requireFunc, key };
    });

    return styles;
  },

  getTheme() {
    return this.theme;
  },

  getConstants() {
    return this.constants;
  }
};