var invariant = require('react/lib/invariant');

module.exports = {
  theme: {},
  animations: {},
  constants: {},

  setup(opts) {
    var { constants, themes, animations } = opts;

    if (constants)
      constants.forEach(this.addConstants.bind(this));

    animations.forEach(this.addAnimation.bind(this));
    themes.forEach(this.addTheme.bind(this));
  },

  // constants are order sensitive and are overwritten on object
  addConstants(constantObj) {
    Object.keys(constantObj).forEach(key => {
      this.constants[key] = constantObj[key];
    });
  },

  addAnimation(animationObj) {
    Object.keys(animationObj).forEach(key => {
      this.animations[key] = animationObj[key];
    });
  },

  // themes are order sensitive and pushed onto array
  // theme: { styles: { key: requireFunc }, (include: [] | exclude: []) }
  addTheme(theme) {
    var { styles, include, exclude } = theme;
    var requireFunc = styles.__requireFunc;
    delete styles.__requireFunc;
    var styleKeys = Object.keys(styles);

    invariant(!(include && exclude), 'Cannot define include and exclude');

    this.addThemeStyles(requireFunc,
      include && include.length ?
        styleKeys.filter(x => include.indexOf(x) !== -1) :
        exclude && exclude.length ?
          styleKeys.filter(x => exclude.indexOf(x) === -1) :
          styleKeys
    );
  },

  // styles: { name: requireFunc }
  addThemeStyles(requireFunc, styles) {
    styles.forEach(key => {
      var style = requireFunc(key);
      if (typeof style === 'function') style = style(this.constants);
      this.theme[key] = (this.theme[key] || []).concat(style);
    });
  },

  // we just store key: true and then __requireFunc: function
  // so we can conditionally require styles later
  makeTheme(requireFunc, components) {
    var styles = {};
    styles.__requireFunc = requireFunc;

    components.forEach(key => {
      styles[key] = true;
    });

    return styles;
  },

  getTheme() {
    return this.theme;
  },

  getStyles(name) {
    return this.theme[name];
  },

  getConstants() {
    return this.constants;
  },

  getAnimations() {
    return this.animations;
  }
};