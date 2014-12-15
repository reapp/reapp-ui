var Component = require('ui/component');
var Animated = require('ui/mixins/Animated');
var TweenState = require('react-tween-state');
var Union = require('lodash-node/modern/arrays/union');

module.exports = Component({
  name: 'Icon',

  mixins: [
    Animated,
    TweenState.Mixin
  ],

  getDefaultProps() {
    return {
      size: 32,
      color: 'currentColor',
      style: {},
      svgProps: {},
      titleBarAnimations: [{ source: 'viewList', animation: 'moveToRight' }]
    };
  },

  componentWillMount() {
    this.setupAnimations(this.props);
  },

  componentWillReceiveProps(nextProps) {
    this.setupAnimations(nextProps);
    if (this.hasAnimation('rotate', nextProps.animations) && !this.state.isRotating) {
      this.setState({ step: 0, index: 1, isRotating: true });
      this.rotate();
    }
  },

  setupAnimations(props) {
    if (props.isInTitleBar)
      props.animations = Union(props.animations || [], this.props.titleBarAnimations);
  },

  rotate() {
    this.tweenState('step', {
      easing: TweenState.easingTypes.linear,
      endValue: 1,
      duration: 1000,
      onEnd: () => {
        this.setState({ step: 0 });

        if (this.hasAnimation('rotate'))
          this.rotate();
        else
          this.setState({ isRotating: false });
      }
    });
  },

  render() {
    var {
      size,
      name,
      color,
      stroke,
      shapeRendering,
      svgProps,
      ...props
    } = this.props;

    this.addStyles({
      color,
      width: size,
      height: size,
      overflow: 'hidden'
    });

    this.addStyles('svg', {
      width: size,
      height: size,
      shapeRendering: shapeRendering ? shapeRendering : 'initial',
      fill: 'currentColor'
    });

    var svgExtraProps = {
      viewBox: '0 0 64 64',
      fill: color
    };

    if (stroke) {
      Object.assign(svgExtraProps, {
        stroke: color,
        strokeWidth: stroke * 4, // were scaling down from 64 / 2
        strokeLinecap: 'round'
      });
    }

    return (
      <span {...this.componentProps()} {...props} style={this.getAnimation()}>
        <svg {...svgExtraProps} {...svgProps} {...this.componentProps('svg')}>
          <g dangerouslySetInnerHTML={{__html:
            '<use xlink:href="/assets/icons/svg/'+ name +'.svg#Layer_1"></use>'
          }} />
        </svg>
      </span>
    );
  }

});