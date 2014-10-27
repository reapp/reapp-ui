var React = require('react');
var ReactStyle = require('react-style');
var DocumentTitle = require('react-document-title');
var AnimatableContainer = require('../helpers/AnimatableContainer');

require('./TitleBar.styl');

var TOOLBAR_HEIGHT = 44;

var TitleBar = React.createClass({
  styles: (height) => ReactStyle({
    fontSize: '16px',
    backgroundColor: '#fff',
    textAlign: 'center',
    borderBottom: '1px solid #ccc',
    zIndex: 100,
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: height || TOOLBAR_HEIGHT
  }),

  shouldComponentUpdate(nextProps) {
    return this.props.titles !== nextProps.titles;
  },

  componentWillReceiveProps(nextProps) {
    if (this.props.step !== nextProps.step) {
      this.animate(nextProps.step);
    }
  },

  componentDidMount() {
    var node = this.getDOMNode();
    if (node) {
      var els = node.querySelectorAll('[data-transform-translate], [data-transform-rotate], [data-transform-scale], [data-transform-opacity]');
      this.transforms = Array.prototype.slice.call(els).map(el => ({
        el: el,
        translate: el.getAttribute('data-transform-translate'),
        rotate: el.getAttribute('data-transform-rotate'),
        scale: el.getAttribute('data-transform-scale'),
        opacity: el.getAttribute('data-transform-opacity')
      }));
    }
  },

  // data-transform-translate="x: -step * 10, y: step-1, z: step+1"
  // data-transform-rotate="x: step, y: step, z: step"
  // data-transform-scale="step*2"

  animate(step) {
    if (!this.transforms) return;
    var attrForStep = (attr) => eval(attr) || 0;

    this.transforms.forEach(transform => {
      console.log('1');
      var transforms = '';

      if (transform.scale)
        transforms += `scale(${attrForStep(step)})`;

      if (transform.rotate) {
        var [ rx, ry, rz ] = transform.rotate.split(',');
        transforms += `rotate3d(${attrForStep(rx)},${attrForStep(ry)},${attrForStep(rz)})`;
      }

      if (transform.translate) {
        var [ tx, ty, tz ] = transform.translate.split(',');
        transforms += `translate3d(${attrForStep(tx)}px, ${attrForStep(ty)}px, ${attrForStep(tz)}px)`;
      }

      if (transform.opacity) {
        transform.el.style.opacity = attrForStep(transform.opacity);
      }

      transform.el.style.WebkitTransform = transforms;
    });
  },

  getBarElements(titles) {
    var result = { left: [], mid: [], right: [] };

    Object.keys(titles).map((id, i) => {
      var { left, mid, right } = titles[id];

      if (this.props.step < i-1 || this.props.step > i+1)
        return null;

      var makeBarElement = this.makeBarElement.bind(this, i, id, this.props.step);

      result.left.push(makeBarElement('left', left));
      result.mid.push(makeBarElement('mid', mid));
      result.right.push(makeBarElement('right', right));
    });

    return result;
  },

  makeBarElement(i, id, step, pos, content) {
    return !content ? null : React.DOM.div({id: `${pos}-${id}`}, content);
  },

  render() {
    if (!this.props.titles) return null;
    var { left, mid, right } = this.getBarElements(this.props.titles);

    return (
      <div className="TitleBar" styles={this.styles(this.props.height)}>
        <div className="TitleBar--left">{left}</div>
        <div className="TitleBar--mid">{mid}</div>
        <div className="TitleBar--right">{right}</div>
      </div>
    );
  }
});

module.exports = TitleBar;