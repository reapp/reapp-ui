var React = require('react');
var Union = require('lodash-node/modern/arrays/union');
var Component = require('../component');
var Animated = require('../mixins/Animated');

module.exports = Component({
  name: 'Icon',

  getDefaultProps() {
    return {
      size: 32,
      color: 'currentColor',
      style: {},
      svgProps: {},
      titleBarAnimations: {
        self: 'moveToRight'
      }
    };
  },

  componentWillMount() {
    this.setupAnimations(this.props);
  },

  componentWillReceiveProps(nextProps) {
    this.setupAnimations(nextProps);
  },

  setupAnimations(props) {
    if (props.isInTitleBar) {
      this.animationSources = { self: 'viewList' };
      this.setState({
        animations: Object.assign(this.props.titleBarAnimations, props.animations)
      });
    }
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

    if (props.style) {
      this.addStyles(props.style);
      delete props.style;
    }

    var svgExtraProps = {
      viewBox: '0 0 64 64',
      fill: color
    };

    if (stroke)
      Object.assign(svgExtraProps, {
        stroke: color,
        strokeWidth: stroke * 4, // were scaling down from 64 / 2
        strokeLinecap: 'round'
      });

    return (
      <span {...this.componentProps()} {...props}>
        <svg {...svgExtraProps} {...svgProps} {...this.componentProps('svg')}>
          <g dangerouslySetInnerHTML={{__html:
            '<use xlink:href="/assets/icons/svg/'+ name +'.svg#Layer_1"></use>'
          }} />
        </svg>
      </span>
    );
  }

});