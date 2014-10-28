var React = require('react/addons');
var ReactStyle = require('react-style');
var DocumentTitle = require('react-document-title');
var AnimatableContainer = require('../helpers/AnimatableContainer');
var ReactDescriptor = require('react/lib/ReactDescriptor');
var Transforms = require('../animations/Transforms');
var ToolbarStyle = require('../style/Toolbar');

require('./TitleBar.styl');

var TitleBar = React.createClass({
  getDefaultProps() {
    return { style: ToolbarStyle(this.props) };
  },

  styles: (props) => ReactStyle(props),

  componentWillReceiveProps(nextProps) {
    this.animate(nextProps.step);
  },

  componentDidMount() {
    if (this.refs.mid) {
      var mid = this.refs.mid.getDOMNode();
      var winCenter = window.innerWidth / 2;
      var midCenter = mid.offsetLeft + (mid.clientWidth / 2);
      mid.style.left = (winCenter-midCenter) + 'px';
    }

    var node = this.getDOMNode();

    if (node) {
      this.numLeft = node.querySelectorAll('[data-transform]').length + Number(node.hasAttribute('data-transform'));
      this.getElementsWithTransforms([], node, this.props.index, nodes => {
        this.transformElements = nodes;
        this.animate(0);
      });
    }
  },

  getElementsWithTransforms(nodes, node, index, cb) {
    if (node.hasAttribute('data-transform')) {
      this.numLeft = this.numLeft - 1;
      nodes.push({
        el: node,
        transform: node.getAttribute('data-transform'),
        index: node.getAttribute('data-transform-index') || index
      });
    }

    if (this.numLeft === 0)
      cb(nodes);
    else {
      var children = Array.prototype.slice.call(node.children);
      children.forEach(child => {
        this.getElementsWithTransforms(nodes, child, node.getAttribute('data-transform-index') || index, cb);
      });
    }
  },

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
    var styles = this.styles(this.props.style);

    // add icon transitions for left and right
    left = this.addIconTransform(left);
    right = this.addIconTransform(right);

    return (
      <div className="TitleBar" data-transform="FADE_LEFT" data-transform-index={this.props.index} styles={styles}>
        <div className="TitleBar--left">{left}</div>
        <div ref="mid" className="TitleBar--mid">{mid}</div>
        <div className="TitleBar--right">{right}</div>
      </div>
    );
  }
});

module.exports = TitleBar;