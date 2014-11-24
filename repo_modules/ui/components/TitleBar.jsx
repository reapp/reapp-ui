var React = require('react/addons');
var Component = require('ui/component');
var DocumentTitle = require('react-document-title');
var AnimatableContainer = require('../helpers/AnimatableContainer');

var TitleBar = Component('titleBar', {
  componentDidMount() {
    this.centerMiddleTitle();
  },

  centerMiddleTitle() {
    if (this.refs.mid) {
      var mid = this.refs.mid.getDOMNode();
      var winCenter = this.refs.titleBar.getDOMNode().clientWidth / 2;
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
    var { children, index, ...props } = this.props;
    if (!children) return null;

    if (Array.isArray(children)) {
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

module.exports = TitleBar;