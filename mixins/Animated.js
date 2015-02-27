var Invariant = require('react/lib/invariant');
var StyleKeys = require('../lib/StyleKeys');
var AnimateStore = require('../stores/AnimateStore');

// This is a somewhat haphazard mixin at the moment that
// organizes and runs animations on elements.

// This mixin works through props, state or the AnimateStore
// should be able to use context rather than store eventually

var defined = variable => (typeof variable !== 'undefined');

module.exports = function(getAnimations) {
  return {
    animateStore: AnimateStore,

    // used by both animators and animated
    // state requires step and index as integers
    // but you can attach other stuff here as well
    getAnimationState(source) {
      if (source && source !== 'self') {
        return Object.assign(
          {},
          this.animateStore(source),
          this.props.animationState && this.props.animationState[source]
        );
      }

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
    setAnimationState(source, state) {
      if (this.state && this.state.animationDisabled)
        return;

      this.animateStore(source, this.getAnimationState());
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
    // requires ref, source will be fetched from this.animationSource
    // if not passed in here
    getAnimationStyle(ref, source) {
      source = source || this.animationSource;

      var animations = this.getAnimations(ref);

      if (!animations)
        return;

      var state = this.getAnimationState(source);
      var styles;

      // single animation or array
      if (typeof animations === 'string')
        styles = this._getAnimationStyle(styles, state, animations);
      else
        for (var i = 0, len = animations.length; i < len; i++)
          styles = this._getAnimationStyle(styles, state, animations[i]);

      // ensure translate-z to ensure hardware accel
      styles[StyleKeys.TRANSFORM] = styles[StyleKeys.TRANSFORM] || 'translateZ(0px)';
      return styles;
    },

    // this takes in step, a styles object, and single animation
    // mutates the style object and returns it
    _getAnimationStyle(styles, state, animation) {
      if (this.getTweeningValue && this.getTweeningValue('step'))
        state.step = this.getTweeningValue('step');

      Invariant(defined(state.step), 'Must define step for animation to run');
      Invariant(defined(state.index), 'Must define index for animation to run');

      // get the animator function set in theme
      var animator = getAnimations(animation);
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
  }
};