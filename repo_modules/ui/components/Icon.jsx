var Component = require('ui/component');

module.exports = Component('Icon', {
  getDefaultProps() {
    return {
      size: 32,
      color: 'currentColor',
      style: {},
      svgProps: {}
    };
  },

  render() {
    var {
      animation,
      size,
      type,
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

    if (animation)
      props.style = this.getAnimationStyles(animation);

    return (
      <span {...props} {...this.componentProps()}>
        <svg {...svgProps}>
          <g dangerouslySetInnerHTML={{__html:
            '<use xlink:href="/icons/svg/'+ type +'.svg#Layer_1"></use>'
          }} />
        </svg>
      </span>
    );
  }

});