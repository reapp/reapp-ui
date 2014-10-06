var React = require('react');
var StaticContainer = require('./StaticContainer');
var StyleKeys = require('../lib/touch/StyleKeys');

var POLL_FACTOR = .5;

var AnimatableContainer = React.createClass({
  getDefaultProps() {
    return {
      blockUpdates: true,
      component: React.DOM.div,
      contentComponent: React.DOM.span,
      opacity: 1,
      rotate: null,
      scale: null,
      timeout: 200,
      translate: null
    };
  },

  componentWillMount() {
    this.wasEverOnGPU = false;
    this.isAnimating = false;
    this.lastAnimationTime = 0;
    this.animationInterval = null;
  },

  componentWillUnmount() {
    if (this.animationInterval) {
      window.clearInterval(this.animationInterval);
    }
  },

  componentWillReceiveProps(nextProps) {
    var prevStyle = this.getStyle(this.props);
    var style = this.getStyle(nextProps);

    this.isAnimating = (
      style['opacity'] !== prevStyle.opacity ||
      style[StyleKeys.TRANSFORM] !== prevStyle[StyleKeys.TRANSFORM]
    );

    if (this.isAnimating) {
      this.lastAnimationTime = Date.now();
      if (this.props.timeout && !this.animationInterval) {
        this.animationInterval = window.setInterval(
          this.checkAnimationEnd,
          this.props.timout * POLL_FACTOR
        );
      }
    }
  },

  checkAnimationEnd() {
    if (Date.now() - this.lastAnimationTime > this.props.timeout) {
      window.clearInterval(this.animationInterval);
      this.animationInterval = null;
      this.isAnimating = false;
      this.forceUpdate();
    }
  },

  getStyle(props) {
    var style = {};

    if (this.props.style) {
      for (var key in this.props.style) {
        style[key] = this.props.style[key];
      }
    }

    var transforms = '';

    if (props.opacity !== 1) {
      style['opacity'] = props.opacity;
    }

    if (props.translate) {
      transforms += (
        'translate3d(' + (props.translate.x || 0) + 'px, ' +
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
      this.wasEverOnGPU = true;
    }
    else {
      if (this.wasEverOnGPU) {
        // avoid flickr on iOS when going to translate3d first time
        style[StyleKeys.TRANSFORM] = 'translate3d(0,0,0)';
      }
    }

    return style;
  },

  render() {
    var component = this.props.component;
    var contentComponent = this.props.contentComponent;

    return (
      <component
        className={this.props.className}
        style={this.getStyle(this.props)}
        styles={this.props.styles || null}>
        <StaticContainer shouldUpdate={!this.props.blockUpdates || !this.isAnimating}>
          <contentComponent>
            {this.props.children}
          </contentComponent>
        </StaticContainer>
      </component>
    );
  }
});

module.exports = AnimatableContainer;