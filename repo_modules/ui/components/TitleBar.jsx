var React = require('react/addons');
var Component = require('ui/component');
var DocumentTitle = require('react-document-title');
var AnimatableContainer = require('../helpers/AnimatableContainer');

require('./TitleBar.styl');

module.exports = Component('TitleBar', {
  getDefaultProps() {
    return {
      animation: 'FADE_LEFT'
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
    if (React.isValidElement(component) && component.type.isButton) {
      var iconProps = Object.assign(
        { animation: 'MOVE_TO_RIGHT' },
        component.props.iconProps
      );

      return React.addons.cloneWithProps(component, { iconProps });
    }

    return component;
  },

  render() {
    var { animation, children, index, active, height, transparent, ...props } = this.props;
    var left, mid, right;

    if (transparent)
      this.addStyles(this.styles.transparent);

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
    left = this.addIconAnimation(left);
    right = this.addIconAnimation(right);

    if (height)
      this.addStyles({ height });

    if (animation)
      props.style = this.getAnimationStyles(animation);

    return (
      <div {...props} {...this.componentProps()}>
        <div {...this.componentProps('left')}>{left}</div>
        <div {...this.componentProps('mid')}>{mid}</div>
        <div {...this.componentProps('right')}>{right}</div>
      </div>
    );
  }
});