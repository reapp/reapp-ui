var React = require('react');
var Component = require('ui/component');
var TitleBar = require('../components/TitleBar');
var StaticContainer = require('../helpers/StaticContainer');
var Animator = require('../lib/mixins/Animator');
var AnimatedScrollToTop = require('../mixins/AnimatedScrollToTop');

module.exports = Component({
  name: 'View',

  mixins: [Animator, AnimatedScrollToTop],

  addTitleBarOffset() {
    var { title, titleBarProps } = this.props;
    var titleBarHeight = titleBarProps && titleBarProps.height;

    if (!titleBarHeight && title)
      titleBarHeight = this.getConstant('titleBarHeight');

    if (titleBarHeight)
      this.addStyles('inner', { top: titleBarHeight });
  },

  hideBoxShadowWhileAnimating() {
    if (this.isAnimating('viewList'))
      this.addStyles('inner', { clip: `rect(0px, ${this.props.width}px, ${this.props.height}px, -10px)` });
    else
      this.addStyles('inner', { boxShadow: 'none' });
  },

  componentWillUpdate() {
    this.animate('inner');
  },

  handleDoubleTap() {
    this.animatedScrollToTop(this.refs.inner.getDOMNode(), 300);
  },

  render() {
    var {
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
      this.addStyles({ pointerEvents: 'all' });

    this.addTitleBarOffset();
    this.hideBoxShadowWhileAnimating();

    return (
      <div {...containerProps} {...this.componentProps()}>
        {title && (
          <TitleBar {...titleBarProps} animateProps={animateProps}>{title}</TitleBar>
        )}
        <div {...props} {...this.componentProps('inner')}>
          <StaticContainer shouldUpdate={this.getAnimationStep('viewList') % 1 === 0}>
            {children}
          </StaticContainer>
        </div>
      </div>
    );
  }
});