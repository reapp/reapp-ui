var React = require('react');
var StyleKeys = require('../lib/StyleKeys');
var invariant = require('react/lib/invariant');
var Matrix = require('css-to-matrix');
var shallowEqual = require('react/lib/shallowEqual');

/*

  ## Animated

  A simple mixin to run animations through context or within a component.

  ### Core concepts

  The Animated mixin uses the `this.context.theme.animations : object`
  to search for animations. Animations are function that take an object,
  like so: `{ index, state, ...extraProps }` and return an object with
  the following options:

  ```
    {
      transform: { x: num, y: num, z: num },
      rotate: num,
      rotate3d: { x: num, y: num, z: num },
      scale: num,
      (opacity, or any other prop): any
    }
  ```

  Extra props can be passed down from a parent Animator by defining
  `this.animationContext (func : object) -> object` on their class.
  The object returned by animationContext is merged into extraProps.

  Within an animated component you can get the current animation state
  with `this.getAnimationState() -> object` or the current animation
  styles with `this.getAnimationStyle() -> object`.

  ### Context animations (Parent to Children)

  In a parent component you define a "step" (props or state), which is
  the current position of the animation. Then on children, you define
  an "index" (property). This mixin then allows you to run
  `this.getAnimationStyle()` on the children, which will use the state
  set in the parents.

  Parents pass down context through `this.context.animations : object`.
  This object should contain a key (the name/source of the animation)
  to the value (an object with at least { step }).

  To ease setting this context, check out the Animator mixin.

*/

const defined = variable => (typeof variable !== 'undefined');

export default {
  contextTypes: {
    animations: React.PropTypes.object,
    theme: React.PropTypes.object
  },

  componentWillMount() {
    this.setAnimationState(this.props);
  },

  componentWillUnmount() {
    if (this.unlistenAnimations)
      this.unlistenAnimations()
  },

  componentWillReceiveProps(nextProps) {
    if (!this.props.animations || this.isAnimating())
      return;

    // check for new animation state
    if (!shallowEqual(nextProps.animationState, this.props.animationState))
      this.setAnimationState(nextProps);
  },

  setAnimationState(props) {
    this.conditionalAnimations = this.getConditionalAnimations(props);
    const hasAnimationProps = this.conditionalAnimations || props.animations;

    if (!hasAnimationProps ||
      (!hasAnimationProps && (!this.state || this.state && !this.state.animations)))
        return;

    const source = props.animationSource || this.state && this.state.animationSource;
    const state = this.context.animations &&
      this.context.animations[source];

    if (!state || typeof state.stepper === 'undefined')
      return;

    this.unlistenAnimations = state.stepper.onChange(
      this.updateAnimationStep.bind(this, source)
    );

    let _animationState = {
      [source]: Object.assign({}, state,this.props.animationState)
    };

    _animationState[source].step = state.stepper.value;

    this.setState({ _animationState });
  },

  getConditionalAnimations(props) {
    if (!props.conditionalAnimations)
      return;

    let propsForAnimations = {};
    let hasPropsForAnimations = false;

    Object.keys(props.conditionalAnimations).forEach(key => {
      if (props[key]) {
        hasPropsForAnimations = true;
        Object.assign(propsForAnimations, props.conditionalAnimations[key]);
      }
    })

    return hasPropsForAnimations ? propsForAnimations : false;
  },

  updateAnimationStep(source, step) {
    this.state._animationState[source].step = step;
    this.forceUpdate();
  },

  getAnimationState(source) {
    if (!source || source === 'self')
      return this.state;
    else
      return this.state && this.state._animationState && this.state._animationState[source];
  },

  disableAnimation() {
    if (!this.state.disableAnimation)
      this.setState({ disableAnimation: true });
  },

  enableAnimation() {
    if (this.state.disableAnimation)
      this.setState({ disableAnimation: false });
  },

  animationsDisabled() {
    return this.props.disableAnimation || this.state && this.state.disableAnimation;
  },

  isAnimating(source) {
    var state = this.getAnimationState(source || this.props.animationSource);
    return state && state.step && state.step % 1 !== 0;
  },

  hasAnimations(ref) {
    return !!this.getAnimations(ref);
  },

  // fetches the list of animations from state or props
  getAnimations(ref) {
    if (this.state && this.state.animations && defined(this.state.animations[ref]))
      return this.state.animations[ref];
    else
      return (
        this.props.animations && this.props.animations[ref] ||
        this.conditionalAnimations && this.conditionalAnimations[ref]
      );
  },

  // returns an object of styles
  // uses ref, source will be fetched from this.props.animationSource or as given
  getAnimationStyle(ref, source) {
    var animations = this.getAnimations(ref);
    var styles;

    if (animations) {
      source = source || this.props.animationSource;

      var state = this.getAnimationState(source);

      // single animation or array
      if (typeof animations === 'string')
        styles = this._getAnimationStyle(styles, state, animations);
      else
        if (animations.length)
          for (var i = 0, len = animations.length; i < len; i++)
            styles = this._getAnimationStyle(styles, state, animations[i]);
    }

    return styles;
  },

  // this takes in step, a styles object, and single animation
  // mutates the style object and returns it
  _getAnimationStyle(styles, state, animation) {
    if (!defined(state.step)) throw new Error('Must define step for animation to run');
    if (!defined(state.index)) throw new Error('Must define index for animation to run');

    var animator = this.context.theme.animations[animation];
    var { scale, rotate, rotate3d, translate, ...other } = animator(state);

    // set styles
    if (other)
      styles = Object.assign(styles || {}, other);

    var transform = this._animationTransformsToString(scale, rotate, rotate3d, translate);

    styles[StyleKeys.TRANSFORM] = transform || this.defaultTransform;
    styles['transformOrigin'] = '50% 50% 0px';

    return styles;
  },

  defaultTransform: 'matrix3d(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)',

  _animationTransformsToString(scale, rotate3d, rotate, translate) {
    const matrix = new Matrix();

    if (defined(scale))
      matrix.scale3d(scale, scale);

    if (defined(rotate3d))
      matrix.rotate3d(rotate3d.x, rotate3d.y, rotate3d.z);
    else if (defined(rotate))
      matrix.rotate(rotate);

    if (defined(translate))
      matrix.translate(translate.x, translate.y, translate.z);

    return matrix.getMatrixCSS();
  },

  // grabs state, if not, then props
  _stateOrProps(...keys) {
    return keys.reduce((acc, key) => {
      acc[key] = this.state && defined(this.state[key]) ? this.state[key] : this.props[key];
      return acc;
    }, {});
  }
};