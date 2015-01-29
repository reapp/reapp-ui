var React = require('react');
var Component = require('../component');
var TitleBar = require('../components/TitleBar');
var StaticContainer = require('../helpers/StaticContainer');
var ScrollTopable = require('../mixins/ScrollTopable');
var AnimatedScrollToTop = require('../mixins/AnimatedScrollToTop');

module.exports = Component({
  name: 'View',

  propTypes: {
    title: React.PropTypes.node,
    index: React.PropTypes.number,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    animations: React.PropTypes.object,
    containerProps: React.PropTypes.object,
    titleBarProps: React.PropTypes.object,
    overlayProps: React.PropTypes.object
  },

  mixins: [
    ScrollTopable('inner'),
    AnimatedScrollToTop
  ],

  animationSources: {
    inner: 'viewList',
    overlay: 'viewList'
  },

  getTitleBarHeight() {
    return (
      this.props.titleBarProps && this.props.titleBarProps.height ||
      this.getConstant('titleBarHeight')
    );
  },

  addTitleBarOffset() {
    if (this.props.title)
      this.addStyles('inner', { top: this.getTitleBarHeight() });
  },

  hideBoxShadowWhileAnimating() {
    if (this.isAnimating('viewList'))
      this.addStyles('inner', { clip: `rect(0px, ${this.props.width}px, ${this.props.height}px, -10px)` });
    else
      this.addStyles('inner', { boxShadow: 'none' });
  },

  handleDoubleTap() {
    if (this.refs.inner)
      this.animatedScrollToTop(this.refs.inner.getDOMNode(), 300);
  },

  hasOverlay() {
    return this.props.animations && this.props.animations.overlay;
  },

  render() {
    var {
      animations,
      children,
      title,
      index,
      width,
      height,
      containerProps,
      titleBarProps,
      overlayProps,
      viewList,
      ...props
    } = this.props;

    // add double tap event
    titleBarProps = titleBarProps || {};
    titleBarProps.onDoubleTap = titleBarProps.onDoubleTap || this.handleDoubleTap;

    var viewListStep = this.getAnimationState('viewList').step;

    if (!index || index === viewListStep)
      this.addStyles('active');

    this.addTitleBarOffset();
    this.hideBoxShadowWhileAnimating();

    if (this.hasOverlay()) {
      this.addStyles('overlay', {
        display: this.isAnimating('viewList') ? 'block' : 'none',
        top: this.getTitleBarHeight()
      });
    }

    return (
      <div {...this.componentProps()} {...containerProps}>
        {title && (
          <TitleBar {...titleBarProps}>{title}</TitleBar>
        )}
        <div {...this.componentProps('inner')} {...props}>
          <StaticContainer shouldUpdate={!animations || viewListStep % 1 === 0}>
            {children}
          </StaticContainer>
        </div>
        {this.hasOverlay() && (
          <div {...this.componentProps('overlay')} {...overlayProps} />
        )}
      </div>
    );
  }
});