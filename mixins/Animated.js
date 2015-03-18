var React = require('react');
var Invariant = require('react/lib/invariant');
var StyleKeys = require('../lib/StyleKeys');
var Animator = require('../mixins/Animator');

// This is a somewhat haphazard mixin at the moment that
// organizes and runs animations on elements.

var defined = variable => (typeof variable !== 'undefined');

module.exports = {
  contextTypes: {
    animations: React.PropTypes.object,
    theme: React.PropTypes.object
  },

  getAnimationState(source) {
    // if the animations are coming from external sources
    if (source && source !== 'self') {
      var state = this.context.animations[source];

      if (!defined(state.index))
        state.index = this.props.index;

      return state;
    }
    // else if animations come from within the component
    else {
      var state = this.stateOrProps(
        'step',
        'index',
        'animationsDisabled'
      );

      // allow defining animationContext on parents
      // this lets you pass down aritrary extra props, besides the three above
      if (this.animationContext)
        Object.assign(state,
          typeof this.animationContext === 'function' ?
            this.animationContext() :
            this.animationContext
        );

      return state;
    }
  },

  // grabs state, if not, then props
  stateOrProps(...keys) {
    return keys.reduce((acc, key) => {
      acc[key] = this.state && defined(this.state[key]) ? this.state[key] : this.props[key];
      return acc;
    }, {});
  },

  // used just by animators
  // pushes their state to the store for children
  setAnimationState(source) {

  },

  disableAnimation() {
    if (!this.state.animationDisabled)
      this.setState({ animationDisabled: true });
  },

  enableAnimation() {
    if (this.state.animationDisabled)
      this.setState({ animationDisabled: false });
  },

  animationsDisabled() {
    return this.props.animationDisabled || this.state && this.state.animationDisabled;
  },

  isAnimating(source) {
    var state = this.getAnimationState(source || this.animationSource);
    return state.step && state.step % 1 !== 0;
  },

  _wasAnimating: {},

  // Because were dealing with time and render lag
  // This can be used in a parent shouldComponentUpdate
  isAnimatingSafe(source) {
    var isAnimating = this.isAnimating(source);
    var wasAnimating = this._wasAnimating[source];

    if (!isAnimating) {
      if (!wasAnimating)
        return false;

      if (wasAnimating > 20) {
        wasAnimating = false;
        return false;
      }

      wasAnimating = wasAnimating++;
      return true;
    }
    else {
      wasAnimating = 1;
      return true;
    }
  },

  hasAnimations(ref) {
    return !!this.getAnimations(ref);
  },

  // fetches the list of animations from state or props
  getAnimations(ref) {
    if (this.state && this.state.animations && defined(this.state.animations[ref]))
      return this.state.animations[ref];
    else
      return this.props.animations && this.props.animations[ref];
  },

  // returns an object of styles
  // uses ref, source will be fetched from this.animationSource or as given
  getAnimationStyle(ref, source) {
    var animations = this.getAnimations(ref);
    var styles;

    if (animations) {
      source = source || this.animationSource;
      var state = this.getAnimationState(source);

      // single animation or array
      if (typeof animations === 'string')
        styles = this._getAnimationStyle(styles, state, animations);
      else
        if (animations.length)
          for (var i = 0, len = animations.length; i < len; i++)
            styles = this._getAnimationStyle(styles, state, animations[i]);

      // ensure translate-z to ensure hardware accel
      styles[StyleKeys.TRANSFORM] = styles[StyleKeys.TRANSFORM] || 'translateZ(0px)';
    }

    return styles;
  },

  // this takes in step, a styles object, and single animation
  // mutates the style object and returns it
  _getAnimationStyle(styles, state, animation) {
    if (this.getTweeningValue && this.getTweeningValue('step'))
      state.step = this.getTweeningValue('step');

    Invariant(defined(state.step), 'Must define step for animation to run');
    Invariant(defined(state.index), 'Must define index for animation to run');

    var animator = this.context.theme.animations[animation];
    var { scale, rotate, rotate3d, translate, ...other } = animator(state);

    // set styles
    styles = Object.assign(styles || {}, other);

    // todo: additive transforms (possible here)
    var transform = this._animationTransformsToString({ scale, rotate, rotate3d, translate });

    if (transform)
      styles[StyleKeys.TRANSFORM] = transform;

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