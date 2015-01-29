var React = require('react/addons');
var Union = require('lodash-node/modern/arrays/union');
var Component = require('../component');
var Animated = require('../mixins/Animated');

module.exports = Component({
  name: 'Icon',

  mixins: [React.addons.PureRenderMixin],

  propTypes: {
    size: React.PropTypes.number,
    path: React.PropTypes.string,
    name: React.PropTypes.string,
    color: React.PropTypes.string,
    stroke: React.PropTypes.number,
    isInTitleBar: React.PropTypes.bool,
    shapeRendering: React.PropTypes.string,
    svgProps: React.PropTypes.object
  },

  getDefaultProps() {
    return {
      size: 32,
      color: 'currentColor',
      path: '/assets/icons',
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
        animations: Object.assign(
          this.props.titleBarAnimations,
          props.animations
        )
      });
    }
  },

  render() {
    var {
      size,
      path,
      name,
      color,
      stroke,
      isInTitleBar,
      shapeRendering,
      svgProps,
      ...props
    } = this.props;

    if (isInTitleBar && color === 'currentColor')
      color = this.getConstant('activeColor');

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

    // todo: hacky
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
            `<use xlink:href="${path}/${name}.svg#Layer_1"></use>`
          }} />
        </svg>
      </span>
    );
  }

});