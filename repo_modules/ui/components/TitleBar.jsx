var React = require('react/addons');
var Component = require('ui/component');
var DocumentTitle = require('react-document-title');
var AnimatableContainer = require('../helpers/AnimatableContainer');
var AcceptsAnimation = require('../mixins/AcceptsAnimation');

require('./TitleBar.styl');

module.exports = Component('TitleBar', {
  mixins: [AcceptsAnimation('viewList')],

  getDefaultProps() {
    return {
      animation: 'fadeLeft'
    };
  },

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

  addIconAnimation(component) {
    var isValid = React.isValidElement(component);

    // add MOVE_TO_RIGHT icon animation if it doesn't have another already
    if (isValid) {
      component.props.iconProps = component.props.iconProps || {};
      component.props.iconProps.animation =
        [].concat(component.props.iconProps.animation, {
          name: 'moveToRight',
          source: 'viewList'
        });
    }

    return isValid ?
      React.addons.cloneWithProps(component, component.props) :
      component;
  },

  render() {
    var { animations, children, index, active, height, transparent, ...props } = this.props;
    var left, mid, right;

    if (transparent)
      this.addStyles(this.styles.transparent);

    if (height)
      this.addStyles({ height });

    if (animations)
      props.style = this.getAnimationStyles(animations);

    // Allow a 3 length array as children rather than setting left and right props
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
    left = this.addIconAnimation(left);
    right = this.addIconAnimation(right);

    return (
      <div {...props} {...this.componentProps()}>
        <div {...this.componentProps('left')}>{left}</div>
        <div {...this.componentProps('mid')}>{mid}</div>
        <div {...this.componentProps('right')}>{right}</div>
      </div>
    );
  }
});