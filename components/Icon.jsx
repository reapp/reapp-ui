var React = require('react/addons');
var Union = require('lodash-node/modern/array/union');
var Component = require('../component');

module.exports = Component({
  name: 'Icon',

  mixins: [
    React.addons.PureRenderMixin
  ],

  propTypes: {
    size: React.PropTypes.number,
    name: React.PropTypes.string,
    color: React.PropTypes.string,
    stroke: React.PropTypes.number,
    isInTitleBar: React.PropTypes.bool,
    shapeRendering: React.PropTypes.string,
    crisp: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      size: 32,
      stroke: 1,
      color: 'currentColor',
      titleBarAnimations: {
        self: 'iconTitleBar'
      }
    };
  },

  componentWillMount() {
    this.setupAnimations(this.props);
  },

  componentWillReceiveProps(nextProps) {
    if (this.props.isInTitleBar !== nextProps.isInTitleBar)
      this.setupAnimations(nextProps);
  },

  setupAnimations(props) {
    if (props.isInTitleBar && props.animations !== false) {
      this.animationSource = 'viewList';
      this.setState({
        animations: Object.assign({},
          this.props.titleBarAnimations,
          props.animations
        )
      });
    }
  },

  render() {
    var {
      size,
      file,
      color,
      stroke,
      isInTitleBar,
      shapeRendering,
      crisp,
      ...props
    } = this.props;

    if (!file)
      return null;

    if (isInTitleBar && color === 'currentColor')
      color = this.getConstant('iconColorTitleBar');

    if (crisp)
      shapeRendering = 'crispEdges';

    this.addStyles({
      width: size,
      height: size,
      shapeRendering: shapeRendering ? shapeRendering : 'initial',
      fill: color
    });

    if (stroke)
      Object.assign(props, {
        stroke: color,
        strokeWidth: stroke * 2, // were scaling down from 64 / 2
        strokeLinecap: 'round'
      });

    return (
      <div {...this.componentProps()}>
        <svg viewBox="0 0 64 64" {...props}>
          <g dangerouslySetInnerHTML={{__html: file }} />
        </svg>
      </div>
    );
  }

});