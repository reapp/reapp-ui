var React = require('react');
var Invariant = require('react/lib/invariant');
var UI = require('ui/index');
var StyleKeys = require('ui/lib/StyleKeys');

// This is a somewhat haphazard mixin at the moment that
// organizes and runs animations on elements.

// This mixin works through props, state or the AnimateStore
// The AnimateStore can be used by the Animator mixin, which
// is used by parent components that want to run an animation
// (until contexts pass through parents at least)

// runAnimations() runs a queue of upcoming animations and
// uses requestAnimationFrame for some performance

// For now I'm testing avoiding the react render pipeline.
// I found that with many animations running at once, even
// with a decent amount of optimization you still are doing
// too much work for mobile browsers.

// This still works nicely with React though. You can control
// animations from within a render(), or componentWillUpdate(),
// or anywhere really.

// Animations are passed through props, but are sideloaded with
// the theme you define. UI.setAnimations is a good starting point

// Expects props to be set in the form of animations key, value is
// an array of animation objects.

// An animation object can have the following props:
//   animation (required) {string} - animation function
//   source (optional) {string} - for info from parents
//   name (optional) {string} - can use as an identifier

// other relevant proprties

// - animationProps: for passing in extra info.
//     Must have a key matching with 'source', inside you can
//     add any info you may need in your animation function
// - animationActive: for disabling animations

var defined = variable => (typeof variable !== 'undefined');
var pick = (a, b) => typeof a !== 'undefined' ? a : b;

module.exports = {
  contextTypes: {
    animations: React.PropTypes.object,
    animationsDisabled: React.PropTypes.bool
  },

  getAnimator(animation) {
    return UI.getAnimations(animation);
  },

  animationsDisabled() {
    return this.props.animationDisabled || this.context.animationDisabled;
  },

  isAnimating(opts) {
    return this.getAnimation(opts).step % 1 !== 0;
  },

  hasAnimation() {
    animations = animations || this.getAnimations();
    return animations.length && !!this.getAnimationProp(animation, animations).length;
  },

  getAnimationState(source) {

  },

  getAnimationStyle({ ref, source }) {
    source = source || this._animationSource || 'self';
    var animations = this.getAnimations(ref);
    var animationState = this.getAnimationState(ref);
    var animation, i, len = animations.length;

    if (!len)
      return;

    var styles, transform;

    // loop through animations
    for (i = 0; i < len; i++) {
      animation = animations[i];

      if (!animation || name && name !== animation.name)
        continue;

      // get index, step and props for animation
      var { index, step, ...props } = this.getAnimationState(animation.source);

      if (!defined(index) && this.state)
        index = this.state.index;

      if (!animation.source && this.getTweeningValue)
        step = this.getTweeningValue('step') || step;

      Invariant(defined(step), 'Must define step for animation to run');
      Invariant(defined(index), 'Must define index for animation to run');

      // get the animator function set in theme
      transform = null;
      var animator = this.getAnimator(animation.animation);
      var { scale, rotate, rotate3d, translate, ...other } = animator(index, step, props);

      // set styles
      styles = Object.assign(styles || {}, other);
      transform = this._animationTransformsToString({ scale, rotate, rotate3d, translate });

      if (transform)
        styles[StyleKeys.TRANSFORM] = transform;
    }

    // ensure translatez to ensure hardware accel
    styles[StyleKeys.TRANSFORM] = styles[StyleKeys.TRANSFORM] || 'translateZ(0px)';

    return styles;
  },

  _animationTransformsToString(transform) {
    if (!transform)
      return;

    var transformString = '';
    var t = transform;

    if (defined(t.scale))
      transformString += `scale(${t.scale}) `;

    if (defined(t.rotate3d))
      transformString += (
        rotate.x ? `rotateX(${t.rotate3d.x || 0}deg)` : '' +
        rotate.y ? `rotateY(${t.rotate3d.y || 0}deg)` : '' +
        rotate.z ? `rotateZ(${t.rotate3d.z || 0}deg)` : ''
      );

    if (defined(t.rotate))
      transformString += `rotate(${t.rotate}deg)`;

    if (defined(t.translate))
      transformString += `translate3d(${t.translate.x || 0}px, ${t.translate.y || 0}px, ${t.translate.z || 0}px)`;

    return transformString;
  }
};