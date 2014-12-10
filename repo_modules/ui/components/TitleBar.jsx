var React = require('react/addons');
var Component = require('ui/component');
var DocumentTitle = require('react-document-title');
var AnimatableContainer = require('../helpers/AnimatableContainer');
var _ = require('lodash-node');

require('./TitleBar.styl');

module.exports = Component({
  name: 'TitleBar',

  getDefaultProps() {
    return {
      width: window.innerWidth,
      iconAnimations: [{ name: 'moveToRight', source: 'viewList' }],
      animations: [{ name: 'fadeLeft', source: 'viewList' }]
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

  addIconProps(component) {
    if (!component || !React.isValidElement(component))
      return component;

    var iconProps = component.props.iconProps || {};
    var animations = _.union(iconProps.animations || [], this.props.iconAnimations);

    iconProps.animateProps = this.context.animateProps;
    iconProps.animations = animations;

    return React.addons.cloneWithProps(component,
      Object.assign(component.props, { iconProps })
    );
  },

  render() {
    var { animations, left, right, children, height, transparent, ...props } = this.props;
    var l, m, r;

    // allow shorthand array entry
    if (!left && !right && Array.isArray(children)) {
      l = children[0];
      m = children[1];
      r = children[2];
    }
    else {
      l = left;
      m = children;
      r = right;
    }

    if (transparent)
      this.addStyles(this.styles.transparent);

    if (height)
      this.addStyles({ height });

    if (animations)
      props.style = this.getAnimationStyles();

    return (
      <div {...props} {...this.componentProps()}>
        <div {...this.componentProps('left')}>
          {this.addIconProps(l)}
        </div>
        <div {...this.componentProps('mid')}>
          {m}
        </div>
        <div {...this.componentProps('right')}>
          {this.addIconProps(r)}
        </div>
      </div>
    );
  }
});