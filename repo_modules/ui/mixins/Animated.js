var React = require('react');
var UI = require('../index');
var StyleKeys = require('../lib/StyleKeys');
var Invariant = require('react/lib/invariant');

var defined = variable => (typeof variable !== 'undefined');

module.exports = {
  isAnimating(source) {
    return this.getAnimationStep(source) % 1 !== 0;
  },

  getAnimation(name) {
    return this.props.animations.filter(a => a.name === name);
  },

  hasAnimation(name) {
    return this.props.animations && !!this.getAnimation(name).length;
  },

  getStepKey(source) {
    return source ? source + 'Step' : 'step';
  },

  getIndexKey(source) {
    return source ? source + 'Index' : 'index';
  },

  getAnimator(source) {
    return UI.getAnimations(source);
  },

  getAnimationStep(source) {
    var stepKey = this.getStepKey(source);
    return this.state && defined(this.state[stepKey]) ?
      this.state[stepKey] :
        defined(this.props[stepKey]) ?
          this.props[stepKey] :
          this.context[stepKey];
  },

  getAnimationIndex(source) {
    var indexKey = this.getIndexKey(source);
    return this.state && defined(this.state[indexKey]) ?
      this.state[indexKey] :
        defined(this.props[indexKey]) ?
          this.props[indexKey] :
          this.conte;
  },

  getAnimationStyles() {
    var styles = {};
    var step, index;

    if (this.props.animations)
      this.props.animations.forEach(animation => {
        var { name, source } = animation;
        index = this.getAnimationIndex(source);
        step = this.getAnimationStep(source);

        // support react-tween-state
        if (this.getTweeningValue && this.getTweeningValue(this.getStepKey(source)))
          step = this.getTweeningValue('step');

        if (!defined(step) || !defined(index))
          throw new Error(`No step or index defined for animation ${source}`);

        var animator = this.getAnimator(name);
        var { scale, rotate, rotate3d, translate, ...other } = animator.call(this, index, step);
        var transformStyle = this.getTransformStyle(scale, rotate, rotate3d, translate);

        styles[StyleKeys.TRANSFORM] = transformStyle ?
          transformStyle :
          'translateZ(0px)'; // translateZ enables hardware accel

        if (other)
          Object.assign(styles, other);
      });

    return styles;
  },

  getTransformStyle(scale, rotate, rotate3d, translate) {
    var transforms = '';

    if (defined(scale))
      transforms += `scale(${scale}) `;

    if (defined(rotate3d))
      transforms += (
          rotate.x ? `rotateX(${rotate3d.x}deg)` : '' +
          rotate.y ? `rotateY(${rotate3d.y}deg)` : '' +
          rotate.z ? `rotateZ(${rotate3d.z}deg)` : ''
      );

    if (defined(rotate))
      transforms += `rotate(${rotate}deg)`;

    if (defined(translate))
      transforms += `translate3d(${translate.x || 0}px, ${translate.y || 0}px, ${translate.z || 0}px)`;

    return transforms ? transforms : null;
  }
};