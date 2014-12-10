var React = require('react');
var UI = require('../index');
var StyleKeys = require('../lib/StyleKeys');
var Invariant = require('react/lib/invariant');

var defined = variable => (typeof variable !== 'undefined');

module.exports = {
  isAnimating(source) {
    return this.getAnimationProps(source).step % 1 !== 0;
  },

  getAnimation(name, animations) {
    animations = animations || this.props.animations;
    return animations.filter(a => a && a.name === name);
  },

  hasAnimation(name, animations) {
    animations = animations || this.props.animations;
    return animations && !!this.getAnimation(name, animations).length;
  },

  getAnimator(name) {
    return UI.getAnimations(name);
  },

  componentWillMount() {
    this.setAnimations(this.props, this.state);
  },

  componentWillUpdate(nextProps, nextState) {
    this.setAnimations(nextProps, nextState);
  },

  setAnimations(props, state) {
    this._animations = {};

    if (props.animations)
      props.animations.forEach(animation => {
        this._animations[animation.source] = Object.assign({},
          this.context && this.context[animation.source] || {},
          props[animation.source] || {},
          state && state[animation.source] || {}
        );
      });
  },

  getAnimationProps(source) {
    if (!source)
      return Object.assign({}, this.context, this.props, this.state);

    return this._animations[source];
  },

  getAnimationStep(source) {
    return this.getAnimationProps(source).step;
  },

  getAnimationStyles() {
    var styles = {};

    if (!this.props.animations)
      return styles;

    var animation;
    var firstTransform = true;
    var i, len = this.props.animations.length;

    for (i = 0; i < len; i++) {
      animation = this.props.animations[i];

      if (!animation)
        continue;

      var { index, step, ...props } = this.getAnimationProps(animation.source);
      index = defined(index) ? index : 1;

      if (!animation.source && this.getTweeningValue && this.getTweeningValue('step'))
        step = this.getTweeningValue('step');

      if (!defined(step))
        continue; // throw new Error(`No step defined for animation ${source}`);

      var animator = this.getAnimator(animation.name);
      var { scale, rotate, rotate3d, translate, ...other } = animator(index, step, props);

      if (firstTransform && (defined(scale) || defined(rotate) || defined(rotate3d) || defined(translate))) {
        firstTransform = false;
        styles.transforms = { scale, rotate, rotate3d, translate };
      }
      else
        this.mergeTransforms(styles.transforms, scale, rotate, rotate3d, translate);

      if (other)
        Object.assign(styles, other);
    }

    return this.animationTransformsToString(styles);
  },

  animationTransformsToString(styles) {
    var transformsString = '';
    var t = styles.transforms;

    if (defined(t.scale))
      transformsString += `scale(${t.scale}) `;

    if (defined(t.rotate3d))
      transformsString += (
        rotate.x ? `rotateX(${t.rotate3d.x || 0}deg)` : '' +
        rotate.y ? `rotateY(${t.rotate3d.y || 0}deg)` : '' +
        rotate.z ? `rotateZ(${t.rotate3d.z || 0}deg)` : ''
      );

    if (defined(t.rotate))
      transformsString += `rotate(${t.rotate}deg)`;

    if (defined(t.translate))
      transformsString += `translate3d(${t.translate.x || 0}px, ${t.translate.y || 0}px, ${t.translate.z || 0}px)`;

    delete styles.transforms;
    styles[StyleKeys.TRANSFORM] = transformsString || 'translateZ(0px)';
    return styles;
  },

  mergeTransforms(transforms, scale, rotate, rotate3d, translate) {
    if (defined(scale)) {
      if (!defined(transforms.scale))
        transforms.scale = 1;

      transforms.scale += 1 - scale;
    }

    if (defined(rotate3d)) {
      if (!defined(transforms.rotate3d))
        transforms.rotate3d = { x: 0, y: 0, z: 0 };

      transforms.rotate3d.x += (rotate3d.x || 0);
      transforms.rotate3d.y += (rotate3d.y || 0);
      transforms.rotate3d.z += (rotate3d.z || 0);
    }

    if (defined(rotate)) {
      transforms.rotate = (transforms.rotate || 0) + rotate;
    }

    if (defined(translate)) {
      if (!defined(transforms.translate))
        transforms.translate = { x: 0, y: 0, z: 0 };

      transforms.translate.x += (translate.x || 0);
      transforms.translate.y += (translate.y || 0);
      transforms.translate.z += (translate.z || 0);
    }
  }
};