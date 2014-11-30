var React = require('react/addons');
var Component = require('ui/component');
var DocumentTitle = require('react-document-title');
var AnimatableContainer = require('../helpers/AnimatableContainer');

require('./TitleBar.styl');

module.exports = Component('TitleBar', {
  componentDidMount() {
    this.centerMiddleTitle();
  },

  componentDidUpdate(prevProps) {
    if (prevProps.title !== this.props.title)
      this.centerMiddleTitle();
  },

  centerMiddleTitle() {
    if (this.refs.mid) {
      var mid = this.refs.mid.getDOMNode();
      var winCenter = this.refs.TitleBar.getDOMNode().clientWidth / 2;
      var midCenter = mid.offsetLeft + (mid.clientWidth / 2);
      mid.style.left = (winCenter-midCenter) + 'px';
    }
  },

  addIconTransform(component) {
    return React.isValidElement(component) ?
      React.addons.cloneWithProps(component, {
        iconProps: Object.assign({}, { transforms: 'MOVE_TO_RIGHT' }, component.props.iconProps)
      }) :
      component;
  },

  render() {
    var { children, index, height, ...props } = this.props;
    var left, mid, right;

    // Allow a 3 arity array as children rather than setting left and right props
    if (!this.props.left && !this.props.right && Array.isArray(children)) {
      left = children[0];
      mid = children[1];
      right = children[2];
    }
    else {
      left = this.props.left;
      mid = children;
      right = this.props.right;
    }

    // add icon transitions for left and right
    left = this.addIconTransform(left);
    right = this.addIconTransform(right);

    this.addStyles({
      zIndex: this.getZIndexForNextLayer() - 1
    });

    if (height)
      this.addStyles({ height });

    return (
      <div {...props} {...this.componentProps()}
        data-transform="FADE_LEFT"
        data-transform-index={index}>
        <div {...this.componentProps('left')}>{left}</div>
        <div {...this.componentProps('mid')}>{mid}</div>
        <div {...this.componentProps('right')}>{right}</div>
      </div>
    );
  }
});