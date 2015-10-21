var React = require('react/addons');
var Component = require('../component');
var MultiTappable = require('../mixins/MultiTappable');
var clone = require('../lib/niceClone');

module.exports = Component({
  name: 'TitleBar',

  propTypes: {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    left: React.PropTypes.node,
    right: React.PropTypes.node,
    transparent: React.PropTypes.bool,

    isInViewList: React.PropTypes.bool,

    // attach to side of screen
    attach: React.PropTypes.string
  },

  mixins: [
    MultiTappable
  ],

  getDefaultProps() {
    return {
      width: window.innerWidth,
      animationSource: 'viewList'
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
      const mid = this.refs.mid.getDOMNode();
      let midLeft;

      if (!this.props.midWidth) {
        const midCenter = mid.offsetLeft + (mid.clientWidth / 2);
        const winCenter = this.props.width / 2;
        midLeft = winCenter - midCenter;
      }
      else {
        midLeft =
          this.props.width / 2 - this.props.midWidth / 2;
      }

      mid.style.left = `${midLeft}px`;
    }
  },

  addTitleBarProps(component) {
    if (!component || !React.isValidElement(component))
      return component;

    return clone(component, {
      isInTitleBar: true,
      isInViewList: this.props.isInViewList,
      animationState: this.props.animationState
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
      attach,
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

    const statusBarHeight = this.getConstant('statusBarHeight');
    if (statusBarHeight)
      this.addStyles({
        height: height + statusBarHeight,
        paddingTop: statusBarHeight
      });
    else if (height)
      this.addStyles({ height });

    if (transparent)
      this.addStyles('transparent');

    if (attach)
      this.addStyles(`attach-${attach}`);

    return (
      <div
        {...this.componentProps()}
        {...this.multiTap(2, this.handleDoubleTap)}
        {...props}>
        {l &&
          <div {...this.componentProps('left')}>
            {this.addTitleBarProps(l)}
          </div>
        }
        <div {...this.componentProps('mid')}>
          {m}
        </div>
        {r &&
          <div {...this.componentProps('right')}>
            {this.addTitleBarProps(r)}
          </div>
        }
      </div>
    );
  }
});