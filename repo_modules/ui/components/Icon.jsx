var Component = require('ui/component');

var Icon = Component('icon', {
  getDefaultProps() {
    return {
      size: 32,
      color: '#777',
      style: {}
    };
  },

  render() {
    var { size, type, color, stroke, ...props } = this.props;

    var svgProps = {
      style: {
        width: size,
        height: size,
        shapeRendering: 'crispEdges',
        fill: 'currentColor'
      },
      viewBox: '0 0 64 64',
      fill: color
    };

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
            '<use xlink:href="/icons/svg/'+ type +'.svg#Layer_1"></use>'
          }} />
        </svg>
      </span>
    );
  }

});

module.exports = Icon;