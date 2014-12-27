var React = require('react/addons');
var Union = require('lodash-node/modern/arrays/union');
var DocumentTitle = require('react-document-title');
var Component = require('../component');
var MultiTappable = require('../mixins/MultiTappable');
var AnimatableContainer = require('../helpers/AnimatableContainer');
var Animated = require('../mixins/Animated');

module.exports = Component({
  name: 'TitleBar',

  mixins: [
    MultiTappable
  ],

  getDefaultProps() {
    return {
      width: window.innerWidth,
      animations: {
        self: 'fadeToLeft'
      }
    };
  },

  animationSources: {
    self: 'viewList'
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
      var winCenter = this.refs.self.getDOMNode().clientWidth / 2;
      var midCenter = mid.offsetLeft + (mid.clientWidth / 2);
      mid.style.left = (winCenter-midCenter) + 'px';
    }
  },

  addIconProps(component) {
    if (!component || !React.isValidElement(component))
      return component;

    var newIconProps = { iconProps:
      Object.assign(component.props.iconProps || {}, { isInTitleBar: true })
    };

    return React.addons.cloneWithProps(component, newIconProps);
  },

  handleDoubleTap() {
    if (this.props.onDoubleTap)
      this.props.onDoubleTap();
  },

  render() {
    var { left, right, children, height, transparent, ...props } = this.props;
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

    return (
      <div
        {...this.componentProps()}
        {...this.multiTap(2, this.handleDoubleTap)}
        {...props}>
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