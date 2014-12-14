var React = require('react');
var UI = require('../../index');
var StyleKeys = require('../StyleKeys');
var Invariant = require('react/lib/invariant');
var AnimateStore = require('../../stores/AnimateStore');

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

// An animation object can have three properties:
//   source {string} - identifier to get info on animation
//   name {string} - identifier for the animation function
//   target {string} - to animate a ref, must have that ref

// other relevant proprties

// - animationProps: for passing in extra info.
//     Must have a key matching with 'source', inside you can
//     add any info you may need in your animation function
// - animationActive: for disabling animations

var defined = variable => (typeof variable !== 'undefined');
var animationQueue = [];

// todo: only run this when we need to
function runAnimations() {
  var i, len = animationQueue.length;
  for (i = 0; i < len; i++) {
    animationQueue[i].setAnimationStyles.call(animationQueue[i]);
  }
  animationQueue = [];
}

module.exports = {
  contextTypes: {
    animateProps: React.PropTypes.object,
    animationsActive: React.PropTypes.bool
  },

  componentWillMount() {
    this.setAnimations(this.props, this.state);
  },

  componentWillUpdate(nextProps) {
    if (!this.props.animations && !nextProps.animations)
      return;

    if (this.hasNewAnimations(nextProps))
      this.setAnimations(nextProps);
    else
      this.updateAnimations();
  },

  componentWillUnmount() {
    if (this._headStyleTag)
      document.head.removeChild(this._headStyleTag);
  },

  animationsDisabled() {
    return this.props.animationDisabled || this.context.animationDisabled;
  },

  setDefaultAnimationTarget(target) {
    this._defaultAnimationTarget = target;
  },

  animate() {
    if (!this.animationsDisabled() && this.props.animations && !this.hasPendingAnimations) {
      animationQueue.push(this);
      this.hasPendingAnimations = true;
      window.requestAnimationFrame(runAnimations);
    }
  },

  isAnimating(source) {
    return this._animations && this.getAnimationProps(source).step % 1 !== 0;
  },

  getAnimationProp(name, animations) {
    animations = animations || this.props.animations;
    return animations.filter(a => a && a.name === name);
  },

  hasAnimation(name, animations) {
    animations = animations || this.props.animations;
    return animations && !!this.getAnimationProp(name, animations).length;
  },

  getAnimator(name) {
    return UI.getAnimations(name);
  },

  hasNewAnimations(nextProps) {
    var animations = nextProps.animations;

    if (!animations)
      return false;

    for (var i = 0, len = animations.length; i < len; i++)
      if (!this.isSameAnimation(animations[i], this.props.animations[i]))
        return true;

    return false;
  },

  setAnimations(props) {
    if (props.animations) {
      this._animations = {};

      props.animations.forEach(animation => {
        this._animations[animation.source] = Object.assign({},
          AnimateStore(animation) || {},
          props && props.animateProps && props.animateProps[animation.source] || {}
        );
      });
    }
  },

  // a slightly quicker version of setAnimations (ignores props)
  updateAnimations() {
    var newProps;

    if (this.props.animations)
      this.props.animations.forEach(animation => {
        newProps = AnimateStore(animation);
        Object.assign(this._animations[animation.source], newProps);
      });
  },

  getAnimationProps(source) {
    return this._animations[source];
  },

  getAnimationStep(source) {
    return this.getAnimationProps(source).step;
  },

  setAnimationStyles() {
    this.hasPendingAnimations = false;
    var animations = this.getAnimations();

    if (!animations || this._lifeCycleState !== 'MOUNTED')
      return;

    var node, selector;
    var hasHeadStyleTag = !!this._headStyleTag;

    if (!hasHeadStyleTag) {
      this._headStyleTag = document.createElement('style');
      this._headStyleTag.ref = this._uniqueID;
    }
    else {
      this._headStyleTag.innerHTML = '';
    }

    Object.keys(animations).forEach(key => {
      node = key === 'self' ?
        this.getDOMNode() :
        this.refs[key] && this.refs[key].getDOMNode();

      if (!node)
        return;

      selector = node.id ?
        `#${node.id}` :
        `[data-reactid="${node.getAttribute('data-reactid')}"]`;

      // set tag styles
      this._headStyleTag.innerHTML +=
        `${selector} {
          ${this.stylesToString(animations[key])}
        }`;
    });

    if (!hasHeadStyleTag)
      document.head.appendChild(this._headStyleTag);
  },

  stylesToString(obj) {
    return Object.keys(obj).reduce(
      (acc, key) =>
        `${key}: ${obj[key]};
         ${acc}`,
      '');
  },

  // this is the meat of it, fetches animations and returns an object
  // of animations. key is the ref, value is an object of styles.
  getAnimations() {
    if (!this.props.animations)
      return;

    // animations = { 'ref': { ...styles } }
    var animations = {};
    var transform;
    var animation, styles, target, i, len = this.props.animations.length;

    // loop through animations
    for (i = 0; i < len; i++) {
      animation = this.props.animations[i];

      if (!animation)
        continue;

      // get index, step and props for animation
      var { index, step, ...props } = this.getAnimationProps(animation.source);

      if (!defined(index) && this.state)
        index = this.state.index;

      if (!animation.source && this.getTweeningValue && this.getTweeningValue('step'))
        step = this.getTweeningValue('step');

      Invariant(defined(step), 'Must define step for animation to run');
      Invariant(defined(index), 'Must define index for animation to run');

      // get the animator function set in theme
      var animator = this.getAnimator(animation.name);
      var { scale, rotate, rotate3d, translate, ...other } = animator(index, step, props);

      // set styles
      styles = Object.assign({}, other);
      styles[StyleKeys.TRANSFORM] = this.animationTransformsToString({ scale, rotate, rotate3d, translate });

      // update animations
      animations[animation.target || this._defaultAnimationTarget || 'self'] = styles;
    }

    return Object.keys(animations).length ? animations : null;
  },

  animationTransformsToString(transform) {
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

    return transformString || 'translateZ(0px)';
  },

  isSameAnimation(a, b) {
    return a.name === b.name && a.source === b.source;
  }
};