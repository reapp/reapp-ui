var React = require('react/addons');
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
    isInViewList: React.PropTypes.bool,
    shapeRendering: React.PropTypes.string,
    crisp: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      size: 32,
      stroke: 1,
      color: 'currentColor',
      viewListAnimations: {
        self: 'iconTitleBar'
      }
    };
  },

  componentWillMount() {
    this.setupAnimations(this.props);
  },

  componentWillReceiveProps(nextProps) {
    if (this.props.isInViewList !== nextProps.isInViewList)
      this.setupAnimations(nextProps);
  },

  setupAnimations(props) {
    if (props.isInViewList && props.animations !== false) {
      this.setState({
        animations: Object.assign({},
          this.props.viewListAnimations,
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
      isInViewList,
      isInTitleBar,
      shapeRendering,
      crisp,
      ...props
    } = this.props;

    if (!file)
      return null;

    if (color === 'currentColor')
      color = this.getConstant(
        isInTitleBar ? 'iconColorTitleBar' : 'iconColor');

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

    if (isInTitleBar)
      this.addStyles('isInTitleBar');

    // center icon
    props.style = Object.assign({
      margin: 'auto',
    }, props.style);

    return (
      <div {...this.componentProps()}>
        <svg viewBox="0 0 64 64" {...props}>
          <g dangerouslySetInnerHTML={{__html: file }} />
        </svg>
      </div>
    );
  }

});