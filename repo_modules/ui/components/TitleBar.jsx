var React = require('react/addons');
var Styled = require('ui/styled');
var DocumentTitle = require('react-document-title');
var AnimatableContainer = require('../helpers/AnimatableContainer');

var TitleBar = React.createClass({
  mixins: [Styled('titlebar')],

  componentDidMount() {
    if (this.refs.mid) {
      var mid = this.refs.mid.getDOMNode();
      var winCenter = this.refs.titlebar.getDOMNode().clientWidth / 2;
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
    var { children, index } = this.props;
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
      <div
        ref="titlebar"
        className="TitleBar"
        data-transform="FADE_LEFT"
        data-transform-index={index}
        styles={this.getStyles()}>
        <div
          className="TitleBar--left"
          styles={this.getStyles('left')}>
          {left}</div>
        <div
          ref="mid"
          className="TitleBar--mid"
          styles={this.getStyles('mid')}>{mid}</div>
        <div
          className="TitleBar--right"
          styles={this.getStyles('right')}>{right}</div>
      </div>
    );
  }
});

module.exports = TitleBar;