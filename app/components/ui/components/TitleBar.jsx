var React = require('react/addons');
var ReactStyle = require('react-style');
var DocumentTitle = require('react-document-title');
var AnimatableContainer = require('../helpers/AnimatableContainer');
var ReactDescriptor = require('react/lib/ReactDescriptor');
var Transforms = require('../animations/Transforms');

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

  componentWillReceiveProps(nextProps) {
    this.animate(nextProps.step);
  },

  componentDidMount() {
    var node = this.getDOMNode();

    if (node) {
      this.transforms = [];
      this.getElementsWithTransforms(this.transforms, node, 0);
      console.log('transforms', this.transforms);
    }
  },

  getElementsWithTransforms(nodes, node, index) {
    if (!node) return;
    if (node.hasAttribute('data-transform'))
      nodes.push({
        el: node,
        transform: node.getAttribute('data-transform'),
        index: node.getAttribute('data-index') || index
      });

    var children = Array.prototype.slice.call(node.children);
    console.log(node.children, children);
    children.forEach(child => {
      this.getElementsWithTransforms(nodes, child, node.getAttribute('data-index') || index);
    });
  },

  // data-transform-translate="-step * 10, step-1, step+1"
  // data-transform-rotate="step, step, step"
  // data-transform-scale="step*2"

  animate(step) {
    if (!this.transforms) return;
    var attrForStep = (attr) => eval(attr) || 0;
    console.log(step);

    this.transforms.forEach(transform => {
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

  addIconTransform(component) {
    return ReactDescriptor.isValidDescriptor(component) ?
      React.addons.cloneWithProps(component, { iconTransforms: 'MOVE_TO_RIGHT' }) :
      component;
  },

  render() {
    if (!this.props.title) return null;

    var [ left, mid, right ] = this.props.title;
    var styles = this.styles(this.props.height);

    // add icon transitions for left and right
    left = this.addIconTransform(left);
    right = this.addIconTransform(right);

    return (
      <div className="TitleBar" data-transforms="FADE_TO_LEFT" data-transform-index={this.props.index} styles={styles}>
        <div className="TitleBar--left">{left}</div>
        <div className="TitleBar--mid">{mid}</div>
        <div className="TitleBar--right">{right}</div>
      </div>
    );
  }
});

module.exports = TitleBar;