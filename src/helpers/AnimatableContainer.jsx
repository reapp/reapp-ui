var React = require('react');
var Component = require('../component');
var StaticContainer = require('./StaticContainer');
var StyleKeys = require('../lib/StyleKeys');

var POLL_FACTOR = 0.5;

var AnimatableContainer = Component({
  name: 'AnimatableContainer',

  getDefaultProps() {
    return {
      blockUpdates: false,
      opacity: 1,
      rotate: null,
      scale: null,
      timeout: 200,
      translate: null
    };
  },

  componentWillMount() {
    this._wasEverOnGPU = false;
    this._isAnimating = false;
    this._lastAnimationTime = 0;
    this._animationInterval = null;
  },

  componentWillUnmount() {
    if (this._animationInterval) {
      window.clearInterval(this._animationInterval);
    }
  },

  componentWillReceiveProps(nextProps) {
    var prevStyle = this.getAnimationStyles(this.props);
    var style = this.getAnimationStyles(nextProps);

    this._isAnimating = (
      style.opacity !== prevStyle.opacity ||
      style[StyleKeys.TRANSFORM] !== prevStyle[StyleKeys.TRANSFORM]
    );

    if (this._isAnimating) {
      this._lastAnimationTime = Date.now();
      if (this.props.timeout && !this._animationInterval) {
        this._animationInterval = window.setInterval(
          this.checkAnimationEnd,
          this.props.timout * POLL_FACTOR
        );
      }
      this.getDOMNode().classList.add('_isAnimating');
    }
  },

  checkAnimationEnd() {
    if (Date.now() - this._lastAnimationTime > this.props.timeout) {
      window.clearInterval(this._animationInterval);
      this._animationInterval = null;
      this._isAnimating = false;
      this.getDOMNode().classList.remove('_isAnimating');
      this.forceUpdate();
    }
  },

  getAnimationStyles(props) {
    var style = Object.assign({}, props.style);
    var transforms = '';

    if (props.opacity !== 1) {
      style.opacity = props.opacity;
    }

    if (props.translate) {
      transforms += (
        'translate3d(' +
          (props.translate.x || 0) + 'px, ' +
          (props.translate.y || 0) + 'px, ' +
          (props.translate.z || 0) + 'px)'
      );
    }

    if (props.rotate) {
      transforms += (
        'rotate3d(' + (props.rotate.x || 0) + ', ' +
        (props.rotate.y || 0) + ', ' +
        (props.rotate.z || 0) + ', ' +
        props.rotate.deg + 'deg)'
      );
    }

    if (props.scale) {
      transforms += 'scale(' + props.scale + ') ';
    }

    if (transforms.length > 0) {
      style[StyleKeys.TRANSFORM] = transforms;
      this._wasEverOnGPU = true;
    }
    else {
      if (this._wasEverOnGPU) {
        // avoid flickr on iOS when going to translate3d first time
        style[StyleKeys.TRANSFORM] = 'translate3d(0,0,0)';
      }
    }

    return style;
  },

  render() {
    var { component, blockUpdates, children, ...props } = this.props;

    return (
      <StaticContainer
        {...props}
        {...this.componentProps()}
        update={!blockUpdates || !this._isAnimating}
        style={this.getAnimationStyles(props)}>
        {children}
      </StaticContainer>
    );
  }
});

module.exports = AnimatableContainer;