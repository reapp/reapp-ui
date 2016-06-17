var React = require('react');
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

  getDefaultProps() {
    return {
      size: 32,
      stroke: 1,
      viewBox: '0 0 64 64',
      color: 'currentColor'
    };
  },

  getInitialState() {
    return {
      svgId: this.get2863key()
    };
  },

  componentDidMount() {
    var svgDoc = new DOMParser().parseFromString(this.props.file, "text/xml");
    var svgElement = document.getElementById(this.state.svgId);
    svgElement.appendChild(svgElement.ownerDocument.importNode(svgDoc.documentElement, true));
  },

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.file !== this.props.file) {
      var svgDoc = new DOMParser().parseFromString(this.props.file, "text/xml");
      var svgElement = document.getElementById(this.state.svgId);
      while(svgElement.firstChild) {
        svgElement.removeChild(svgElement.firstChild);
      }
      svgElement.appendChild(svgElement.ownerDocument.importNode(svgDoc.documentElement, true));
    }
  },

  get2863key() {
      var nextProps = this.props;
      var nextState = this.state;
      var lastProps = this._lastProps2863;
      var lastState = this._lastState2863;

      if (!_.isEqual(lastProps, nextProps)
      || !_.isEqual(lastState, nextState)) {

          this._cached2863Key = Date.now();
      }

      this._lastProps2863 = nextProps;
      this._lastState2863 = nextState;
      return this._cached2863Key;
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
      <svg viewBox={viewBox} {...props} {...this.componentProps()}>
        <g id={this.state.svgId} key={this.state.svgId} />
      </svg>
    );
  }

});