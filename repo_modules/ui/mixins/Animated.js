var UI = require('../index');
var StyleKeys = require('../lib/StyleKeys');
var Invariant = require('react/lib/invariant');

var defined = variable => (typeof variable !== 'undefined');

module.exports = {
  getAnimation(name) {
    return UI.getAnimations()[name];
  },

  getAnimationStyles(name) {
    var index = this.props.index;
    if (!defined(index)) index = this.context.index;
    var step = this.props.step;
    if (!defined(step)) step = this.context.step;

    Invariant(typeof step === 'number' && typeof index === 'number',
      'Must have defined step and index in either props or context to run an animation');

    var animation = this.getAnimation(name);
    var { scale, rotate, translate, ...other } = animation.call(this, index, step);
    var styles = {};
    var transformStyle = this.getTransformStyle(scale, rotate, translate);

    if (transformStyle)
      styles[StyleKeys.TRANSFORM] = transformStyle;

    if (other)
      Object.assign(styles, other);

    console.log(styles);
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