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