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
    overlayProps: React.PropTypes.object,

    // disable pointer events
    inactive: React.PropTypes.bool,

    // make the StaticContainer inside fullscreen
    fullscreen: React.PropTypes.bool
  },

  mixins: [
    ScrollTopable('inner'),
    AnimatedScrollToTop
  ],

  animationSource: 'viewList',

  componentWillMount() {
    this.setClipStyles(this.props);
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.width !== this.props.width ||
      nextProps.height !== this.props.height)
      this.setClipStyles(nextProps);
  },

  getTitleBarHeight() {
    return (
      this.props.titleBarProps && this.props.titleBarProps.height ||
      this.getConstant('titleBarHeight')
    );
  },

  addTitleBarOffset(top) {
    if (this.props.title)
      this.addStyles('inner', { top });
  },

  setClipStyles(props) {
    if (props && props.width && props.height)
      this.clipStyles = {
        clip: `rect(0px, ${props.width}px, ${props.height}px, -10px)`
      };
  },

  boxShadowWhileAnimating() {
    if (this.isAnimating('viewList'))
      this.addStyles('inner', this.clipStyles);
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
      animationState,
      children,
      title,
      index,
      width,
      height,
      containerProps,
      titleBarProps,
      overlayProps,
      viewList,
      viewListType,
      inactive,
      fullscreen,
      ...props
    } = this.props;

    // add double tap event
    titleBarProps = titleBarProps || {};
    titleBarProps.onDoubleTap = titleBarProps.onDoubleTap || this.handleDoubleTap;

    var viewListStep = this.getAnimationState('viewList').step;
    var titleBarHeight = this.getTitleBarHeight();

    if (inactive)
      this.addStyles('inactive');

    this.boxShadowWhileAnimating();
    this.addTitleBarOffset(titleBarHeight);

    if (this.hasOverlay())
      this.addStyles('overlay', {
        display: this.isAnimating('viewList') ? 'block' : 'none',
        top: titleBarHeight
      });

    return (
      <div {...this.componentProps()} {...containerProps}>
        {title && (
          <TitleBar {...titleBarProps}>{title}</TitleBar>
        )}
        <div {...this.componentProps('inner')} {...props}>
          <StaticContainer
            styles={fullscreen ? this.getStyles('fullScreen') : null}
            shouldUpdate={!animations || viewListStep % 1 === 0}>
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