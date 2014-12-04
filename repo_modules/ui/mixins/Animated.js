var React = require('react');
var UI = require('../index');
var StyleKeys = require('../lib/StyleKeys');
var Invariant = require('react/lib/invariant');

var defined = variable => (typeof variable !== 'undefined');

module.exports = {
  contextTypes: {
    index: React.PropTypes.number,
    step: React.PropTypes.number
  },

  isAnimating() {
    return this.getAnimationStep() % 1 !== 0;
  },

  getAnimation(name) {
    return UI.getAnimations()[name];
  },

  getAnimationStep() {
    return defined(this.props.step) ?
      this.props.step :
      this.context.step;
  },

  getAnimationIndex() {
    return defined(this.props.index) ?
      this.props.index :
      this.context.index;
  },

  getAnimationStyles(name) {
    var step = this.getAnimationStep();
    var index = this.getAnimationIndex();
    var styles = {};

    if (typeof step !== 'number' && typeof index !== 'number')
      return styles;

    var animation = this.getAnimation(name);
    var { scale, rotate, translate, ...other } = animation.call(this, index, step);
    var transformStyle = this.getTransformStyle(scale, rotate, translate);

    styles[StyleKeys.TRANSFORM] = transformStyle ?
      transformStyle :
      'translateZ(0px)'; // translateZ enables hardware accel

    if (other)
      Object.assign(styles, other);

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