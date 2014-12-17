var Invariant = require('react/lib/invariant');
var UI = require('../index');
var StyleKeys = require('../lib/StyleKeys');
var AnimateStore = require('../stores/AnimateStore');

// This is a somewhat haphazard mixin at the moment that
// organizes and runs animations on elements.

// This mixin works through props, state or the AnimateStore

// Keep having to rewrite this as I refactor... docs coming...


var defined = variable => (typeof variable !== 'undefined');

module.exports = {
  getAnimator(animation) {
    return UI.getAnimations(animation);
  },

  animateStore: AnimateStore,

  // used by both animators and animated
  // state requires step and index as integers
  // but you can attach other stuff here as well
  getAnimationState(source) {
    if (source && source !== 'self') {
      return Object.assign(
        this.animateStore(source),
        this.props[source]
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
      Object.assign(state, typeof this.animationContext === 'function' ?
        this.animationContext() : this.animationContext);

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
  setAnimationState(source) {
    this.animateStore(source, this.getAnimationState());
  },

  disableAnimation() {
    this.setState({ animationDisabled: true });
  },

  enableAnimation() {
    this.setState({ animationDisabled: false });
  },

  animationsDisabled() {
    return this.props.animationDisabled || this.state && this.state.animationDisabled;
  },

  isAnimating(source) {
    return this.getAnimationState(source).step % 1 !== 0;
  },

  hasAnimations(ref) {
    return !!this.getAnimations(ref);
  },

  // fetches the list of animations from state or props
  getAnimations(ref) {
    // console.log('GET', this._uniqueID, this.state, this.props);
    if (this.state && this.state.animations && defined(this.state.animations[ref]))
      return this.state.animations[ref];
    else
      return this.props.animations && this.props.animations[ref];
  },

  // set a default source for an animation, of you can just
  // define it on your class with animationSources: {}
  setAnimationSource(ref, source) {
    this.animationSources = this.animationSources || {};
    this.animationSources[ref] = source;
  },

  getAnimationSource(ref) {
    return this.animationSources && this.animationSources[ref] || 'self';
  },

  // returns an object of styles
  // requires ref, source will be fetched from this.animationSources
  // if not passed in here
  getAnimationStyle(ref, source) {
    source = source || this.getAnimationSource(ref);
    var animations = this.getAnimations(ref);
    var state = this.getAnimationState(source);
    var styles;

    // if (Number(this._uniqueID.slice(3)) > 400)
    //   debugger

    // single animation or array
    if (typeof animations === 'string')
      styles = this._getAnimationStyle(styles, state, animations);
    else
      if (animations.length)
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
    var animator = this.getAnimator(animation);
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

// todo: parent context
// contextTypes: {
//   animations: React.PropTypes.object,
//   animationsDisabled: React.PropTypes.bool
// },

// return this.context.animations[source];