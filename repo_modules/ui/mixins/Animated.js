var UI = require('../index');
var StyleKeys = require('../lib/StyleKeys');

function defined(variable) {
  return typeof variable !== 'undefined';
}

module.exports = {
  getAnimation(name) {
    return UI.getAnimations()[name];
  },

  getAnimationStyles(name) {
    var index = this.props.index || this.context.index;
    var step = this.props.step || this.context.step;
    var { scale, rotate, translate, ...other } = this.getAnimation(name)(index, step);

    var styles = [];
    var transformStyle = getTransformStyle(scale, rotate, translate);

    if (transformStyle) {
      var transformStyles = {};
      transformStyles[StyleKeys.TRANSFORM] = transforms;
      styles.push(transformStyles);
    }

    if (other)
      styles.push(other);

    return styles;
  },

  getTransformStyle(scale, rotate, translate) {
    var transforms = '';

    if (defined(scale))
      transforms += `scale(${scale}) `;

    if (defined(rotate))
      transforms += `rotate3d(${rotate.x || 0},${rotate.y || 0},${rotate.z || 0}) `;

    if (defined(translate))
      transforms += `translate3d(${translate.x || 0}px, ${translate.y || 0}px, ${translate.z || 0}px)`;

    return transforms ? transforms : null;
  }
};