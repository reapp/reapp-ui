var React = require('react');
var Component = require('ui/component');
var TitleBar = require('../components/TitleBar');
var StaticContainer = require('../helpers/StaticContainer');
var Animator = require('../lib/mixins/Animator');
var ScrollTopable = require('../mixins/ScrollTopable');
var AnimatedScrollToTop = require('../mixins/AnimatedScrollToTop');

module.exports = Component({
  name: 'View',

  mixins: [
    ScrollTopable,
    Animator,
    AnimatedScrollToTop
  ],

  componentWillMount() {
    this.setDefaultAnimationTarget('inner');
  },

  componentDidMount() {
    this.setScrollTop();
  },

  setScrollTop() {
    if (this.props.scrollTop)
      this.refs.inner.getDOMNode().scrollTop = this.props.scrollTop;
    else if (
      Array.isArray(this.props.children) &&
      this.props.children[0] &&
      this.props.children[0].type.isSearchBar
    )
      this.refs.inner.getDOMNode().scrollTop = this.getConstant('scrollBarHeight');
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

  componentWillUpdate() {
    this.animate();
  },

  handleDoubleTap() {
    if (this.refs.inner)
      this.animatedScrollToTop(this.refs.inner.getDOMNode(), 300);
  },

  hasOverlay() {
    return this.props.animations &&
      !!this.props.animations.filter(a => a.target === 'overlay').length;
  },

  render() {
    var {
      animations,
      children,
      title,
      index,
      width,
      height,
      animateProps,
      containerProps,
      titleBarProps,
      ...props
    } = this.props;

    // add double tap event
    if (!titleBarProps)
      titleBarProps = { onDoubleTap: this.handleDoubleTap };
    else if (!titleBarProps.onDoubleTap)
      titleBarProps.onDoubleTap = this.handleDoubleTap;

    if (!index || index === this.getAnimationStep('viewList'))
      this.addStyles('active');

    this.addTitleBarOffset();
    this.hideBoxShadowWhileAnimating();

    return (
      <div {...containerProps} {...this.componentProps()}>
        {title && (
          <TitleBar {...titleBarProps} animateProps={animateProps}>{title}</TitleBar>
        )}
        <div {...props} {...this.componentProps('inner')}>
          <StaticContainer shouldUpdate={!this.props.animations || this.getAnimationStep('viewList') % 1 === 0}>
            {children}
          </StaticContainer>
        </div>
        {this.hasOverlay() && (
          <div {...this.componentProps('overlay')} style={{
            top: this.getTitleBarHeight(),
            display: this.isAnimating('viewList') ? 'block' : 'none'
          }} />
        )}
      </div>
    );
  }
});