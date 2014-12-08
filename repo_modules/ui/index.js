var Invariant = require('react/lib/invariant');

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

    Invariant(!(include && exclude), 'Cannot define include and exclude');

    this._addStyles(requireFunc,
      include && include.length ?
        styleKeys.filter(x => include.indexOf(x) !== -1) :
        exclude && exclude.length ?
          styleKeys.filter(x => exclude.indexOf(x) === -1) :
          styleKeys
    );
  },

  // styles: { name: requireFunc }
  _addStyles(requireFunc, styles) {
    styles.forEach(key => {
      var style = requireFunc(key);
      if (typeof style === 'function')
        style = style(this.constants);
      this.styles[key] = (this.styles[key] || []).concat(style);
    });
  },

  // we just store key: true and then __requireFunc: function
  // so we can conditionally require styles later
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

  getConstants() {
    return this.constants;
  },

  getAnimations() {
    return this.animations;
  }
};