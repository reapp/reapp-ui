var React = require('react');
var UI = require('../../index');
var StyleKeys = require('../StyleKeys');
var Invariant = require('react/lib/invariant');
var AnimateStore = require('../../stores/Animate');

var defined = variable => (typeof variable !== 'undefined');

module.exports = {
  contextTypes: {
    animateProps: React.PropTypes.object
  },

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

  componentWillUpdate(nextProps) {
    if (!this.props.animations && !nextProps.animations)
      return;

    if (this.hasNewAnimations(nextProps))
      this.setAnimations(nextProps);
    else
      this.updateAnimations();
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
    this._animations = {};

    if (props.animations)
      props.animations.forEach(animation => {
        this._animations[animation.source] = Object.assign({},
          AnimateStore(animation.source, this._mountDepth) || {},
          props && props.animateProps && props.animateProps[animation.source] || {}
        );
      });
  },

  // a slightly quicker version of setAnimations (ignores props)
  updateAnimations() {
    var newProps;

    this.props.animations.forEach(animation => {
      newProps = AnimateStore(animation.source, this._mountDepth);
      Object.assign(this._animations[animation.source], newProps);
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

  setAnimationStyles(part) {
    var styles = this.getAnimationStyles();
    var node = (part ? this.refs[part].getDOMNode() : this.getDOMNode());
    var reactID = node.getAttribute('data-reactid');
    var headStyleID = `animate-${reactID}`;
    var headStyleTag = document.getElementById(headStyleID);
    var hasHeadStyleTag = !!headStyleTag;

    if (!hasHeadStyleTag) {
      headStyleTag = document.createElement('style');
      headStyleTag.id = headStyleID;
    }

    headStyleTag.innerHTML =
      `[data-reactid="${reactID}"] {
        ${this.stylesToString(styles)}
      }`;

    if (!hasHeadStyleTag)
      document.head.appendChild(headStyleTag);
  },

  stylesToString(obj) {
    return Object.keys(obj).reduce((acc, key) => `${key}: ${obj[key]} !important; ${acc}`, '');
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

    if (t) {
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
    }

    delete styles.transforms;
    styles['transform'] = transformsString || 'translateZ(0px)';
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
  },

  isSameAnimation(a, b) {
    return a.name === b.name && a.source === b.source;
  }
};