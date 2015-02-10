var React = require('react/addons');
var Component = require('../component');
var MultiTappable = require('../mixins/MultiTappable');

module.exports = Component({
  name: 'TitleBar',

  propTypes: {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    animations: React.PropTypes.object,
    left: React.PropTypes.node,
    right: React.PropTypes.node,
    transparent: React.PropTypes.bool
  },

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

  animationSource: 'viewList',

  componentDidMount() {
    setTimeout(this.centerMiddleTitle);
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

  addTitleBarProps(component) {
    if (!component || !React.isValidElement(component))
      return component;

    return React.addons.cloneWithProps(component, {
      isInTitleBar: true,
      animationState: Object.assign({}, this.props.animationState)
    });
  },

  handleDoubleTap() {
    if (this.props.onDoubleTap)
      this.props.onDoubleTap();
  },

  render() {
    var {
      left,
      right,
      children,
      height,
      transparent,
      ...props } = this.props;

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
      this.addStyles('transparent');

    if (height)
      this.addStyles({ height });

    return (
      <div
        {...this.componentProps()}
        {...this.multiTap(2, this.handleDoubleTap)}
        {...props}>
        <div {...this.componentProps('left')}>
          {this.addTitleBarProps(l)}
        </div>
        <div {...this.componentProps('mid')}>
          {m}
        </div>
        <div {...this.componentProps('right')}>
          {this.addTitleBarProps(r)}
        </div>
      </div>
    );
  }
});