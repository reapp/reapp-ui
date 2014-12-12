var Component = require('ui/component');
var TweenState = require('react-tween-state');

module.exports = Component({
  name: 'Icon',

  mixins: [
    TweenState.Mixin
  ],

  getDefaultProps() {
    return {
      size: 32,
      color: 'currentColor',
      style: {},
      svgProps: {}
    };
  },

  componentWillReceiveProps(nextProps) {
    if (this.hasAnimation('rotate', nextProps.animations) && !this.state.isRotating) {
      this.setState({ step: 0, isRotating: true });
      this.rotate();
    }
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

  componentDidUpdate() {
    this.animate();
  },

  render() {
    var {
      animations,
      size,
      name,
      color,
      stroke,
      shapeRendering,
      svgProps,
      ...props
    } = this.props;

    svgProps = Object.assign({
      style: Object.assign({
        width: size,
        height: size,
        shapeRendering: shapeRendering ? shapeRendering : 'initial',
        fill: 'currentColor'
      }, svgProps.style),
      viewBox: '0 0 64 64',
      fill: color
    }, svgProps);

    if (stroke) {
      Object.assign(svgProps, {
        stroke: color,
        strokeWidth: stroke * 4, // were scaling down from 64 / 2
        strokeLinecap: 'round'
      });
    }

    Object.assign(props.style, {
      color: color,
      width: size,
      height: size,
      overflow: 'hidden'
    }, props.style);

    return (
      <span {...props} {...this.componentProps()}>
        <svg {...svgProps}>
          <g dangerouslySetInnerHTML={{__html:
            '<use xlink:href="/assets/icons/svg/'+ name +'.svg#Layer_1"></use>'
          }} />
        </svg>
      </span>
    );
  }

});