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
      this.transformElements = [];
      this.getElementsWithTransforms(this.transformElements, node, this.props.index);
      console.log('transforms', this.transformElements);
    }
  },

  getElementsWithTransforms(nodes, node, index) {
    if (node.hasAttribute('data-transforms'))
      nodes.push({
        el: node,
        transform: node.getAttribute('data-transforms'),
        index: node.getAttribute('data-index') || index
      });

    var children = Array.prototype.slice.call(node.children);
    children.forEach(child => {
      this.getElementsWithTransforms(nodes, child, node.getAttribute('data-index') || index);
    });
  },

  // data-transform-translate="-step * 10, step-1, step+1"
  // data-transform-rotate="step, step, step"
  // data-transform-scale="step*2"

  animate(step) {
    if (!this.transformElements) return;
    this.transformElements.forEach(transformElement => {
      var { el, transform, index } = transformElement;
      Transforms[transform](el, index, step);
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