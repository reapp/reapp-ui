var React = require('react');
var Component = require('../component');
var TitleBar = require('../components/TitleBar');
var StaticContainer = require('../helpers/StaticContainer');
var ScrollTopable = require('../mixins/ScrollTopable');
var AnimatedScrollToTop = require('../mixins/AnimatedScrollToTop');
var Animator = require('../lib/Animator');
var ScrollState = require('../mixins/ScrollState');

module.exports = Component({
  name: 'View',

  mixins: [
    ScrollState,
    ScrollTopable('static'),
    AnimatedScrollToTop,
    Animator('viewList', ['index'])
  ],

  propTypes: {
    title: React.PropTypes.node,
    titleLeft: React.PropTypes.node,
    titleRight: React.PropTypes.node,
    centerMiddleTitle: React.PropTypes.bool,

    index: React.PropTypes.number,

    // add animations in view list
    isInViewList: React.PropTypes.bool,

    animations: React.PropTypes.object,

    // pass inner div props (scrollable content)
    innerProps: React.PropTypes.object,

    // pass titlebar props
    titleBarProps: React.PropTypes.object,

    // pass overlay div props
    overlayProps: React.PropTypes.object,

    // place a node outside the inner pane
    after: React.PropTypes.node,

    // disable pointer events
    inactive: React.PropTypes.bool,

    // make the StaticContainer inside fullscreen
    fullscreen: React.PropTypes.bool,

    // set the scrolling ability of static container
    scrollingEnabled: React.PropTypes.bool,

    // see scrollTopable
    scrollTop: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),

    // don't add extra visuals like shadow/overlay
    plain: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      centerMiddleTitle: true,
      scrollingEnabled: true
    };
  },

  animationSource: 'viewList',

  componentWillMount() {
    // set animationContext
    this.animationContext = {
      index: this.props.index
    };
  },

  componentDidMount() {
    if (this.props.onComponentMounted)
      this.props.onComponentMounted(this.props.index);
  },

  handleDoubleTap() {
    if (this.refs.inner)
      this.animatedScrollToTop(this.refs.inner, 300, this.getScrollTop());
  },

  hasOverlay() {
    return this.props.animations && this.props.animations.overlay;
  },

  render() {
    var {
      animations,
      children,
      title,
      titleLeft,
      titleRight,
      index,
      width,
      height,
      innerProps,
      titleBarProps,
      overlayProps,
      viewList,
      inactive,
      fullscreen,
      scrollingEnabled,
      after,
      plain,
      isInViewList,
      ...props
    } = this.props;

    // titlebar props modifications
    var modifiedTitleBarProps = Object.assign({
      onDoubleTap: this.handleDoubleTap,
      isInViewList,
      centerMiddleTitle: this.props.centerMiddleTitle
    }, titleBarProps);

    var shouldUpdate = !animations || !inactive;

    if (inactive)
      this.addStyles('inactive');

    if (plain)
      this.addStyles('static', 'plain');

    if (this.hasOverlay())
      this.addStyles('overlay', {
        display: inactive ? 'block' : 'none',
        top: this.props.titleBarHeight || this.getConstant('titleBarHeight')
      });

    var staticStyles = { self: this.getStyles('static') };

    console.log('View.jsx this.props.scrollingEnabled: ' + this.props.scrollingEnabled);

    return (
      <div {...this.componentProps()} {...props}>
        {title && (
          <TitleBar
            left={titleLeft}
            right={titleRight}
            {...modifiedTitleBarProps}>
            {title}
          </TitleBar>
        )}

        <div {...this.componentProps('inner')} {...innerProps}>
          <StaticContainer
            styles={staticStyles}
            fullscreen={fullscreen}
            update={shouldUpdate}
            scrollingEnabled={scrollingEnabled}>
            {children}
          </StaticContainer>
          {!plain &&
            <div {...this.componentProps('shadow')} />
          }
        </div>

        {after &&
          <StaticContainer update={shouldUpdate}>
            {after}
          </StaticContainer>
        }

        {!plain && this.hasOverlay() && (
          <div {...this.componentProps('overlay')} {...overlayProps} />
        )}
      </div>
    );
  }
});
