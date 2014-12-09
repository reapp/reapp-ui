var React = require('react');
var UI = require('../index');
var StyleKeys = require('../lib/StyleKeys');
var Invariant = require('react/lib/invariant');

var defined = variable => (typeof variable !== 'undefined');

module.exports = {
  isAnimating(source) {
    return this.getAnimationProps(source).step % 1 !== 0;
  },

  getAnimation(name) {
    return this.props.animations.filter(a => a && a.name === name);
  },

  hasAnimation(name) {
    return this.props.animations && !!this.getAnimation(name).length;
  },

  getAnimator(name) {
    return UI.getAnimations(name);
  },

  getAnimationProps(source) {
    if (!source)
      return Object.assign({}, this.context, this.props, this.state);

    return Object.assign({},
      this.context[source] || {},
      this.props[source] || {},
      this.state && this.state[source] || {}
    );
  },

  getAnimationStep(source) {
    return this.getAnimationProps(source).step;
  },

  getAnimationStyles() {
    var styles = {};
    var step, index;

    if (this.props.animations)
      this.props.animations.forEach(animation => {
        if (!animation) return;

        var { name, source } = animation;
        var { index, step, ...props } = this.getAnimationProps(source);
        console.log('aniamtionProps', name, source, index, step, props, this.context);


        if (!defined(step) || !defined(index))
          return; // throw new Error(`No step or index defined for animation ${source}`);

        var animator = this.getAnimator(name);
        var { scale, rotate, rotate3d, translate, ...other } = animator.call(this, index, step, props);
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