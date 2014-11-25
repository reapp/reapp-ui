var invariant = require('react/lib/invariant');

module.exports = {
  theme: {},
  constants: {},

  setup(opts) {
    var { constants, themes } = opts;

    constants.forEach(constantObj => this.addConstants);
    themes.forEach(themeObj => this.addTheme);
  },

  // constants are order sensitive and are overwritten on object
  addConstants(constantObj) {
    Object.keys(constantObj).forEach(key => {
      this.constants[key] = constantObj[key];
    });
  },

  // themes are order sensitive and pushed onto array
  // theme: { styles: { key: requireFunc }, (include: [] | exclude: []) }
  addTheme(theme) {
    var { styles, include, exclude } = theme;
    var styleKeys = Object.keys(styles);

    invariant(!(include && exclude), 'Cannot define include and exclude');

    addThemeStyles(
      include ?
        styleKeys.filter(x => include.indexOf(x.key) !== -1) :
        exclude ?
          styleKeys.filter(x => exclude.indexOf(x.key) === -1) :
          styleKeys
    );
  },

  // styles: { name: requireFunc }
  addThemeStyles(styles) {
    styles.forEach(key => {
      var requireFunc = styles[key];
      var styleObj = requireFunc(key);
      this.theme[key] = (this.theme[key] || []).concat(styleObj);
    });
  },

  // we just store an object the lets us require the styles later if needed
  makeTheme(requireFunc, components) {
    var styles = {};

    components.forEach(key => {
      styles[key] = requireFunc;
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