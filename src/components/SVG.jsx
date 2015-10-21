var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var Component = require('../component');

module.exports = Component({
  name: 'SVG',

  propTypes: {
    size: React.PropTypes.number,
    name: React.PropTypes.string,
    color: React.PropTypes.string,
    stroke: React.PropTypes.number,
    shapeRendering: React.PropTypes.string,
    viewBox: React.PropTypes.string,
    crisp: React.PropTypes.bool
  },

  mixins: [
    PureRenderMixin
  ],

  getDefaultProps() {
    return {
      size: 32,
      stroke: 1,
      viewBox: '0 0 64 64',
      color: 'currentColor'
    };
  },

  render() {
    var {
      size,
      file,
      color,
      stroke,
      shapeRendering,
      viewBox,
      crisp,
      ...props
    } = this.props;

    if (!file)
      return null;

    this.addStyles({
      shapeRendering: shapeRendering ? shapeRendering : 'initial',
      fill: color
    });

    if (crisp)
      shapeRendering = 'crispEdges';

    if (stroke)
      Object.assign(props, {
        stroke: color,
        strokeWidth: stroke * 2, // were scaling down from 64 / 2
        strokeLinecap: 'round'
      });

    // center icon
    props.style = Object.assign({
      margin: 'auto',
    }, props.style);

    return (
      <svg viewBox={viewBox} {...this.componentProps()} {...props}>
        <g dangerouslySetInnerHTML={{__html: file }} />
      </svg>
    );
  }

});
