var React = require('react');
var Component = require('ui/component');
var TitleBar = require('../components/TitleBar');
var StaticContainer = require('../helpers/StaticContainer');
var Animator = require('../lib/mixins/Animator');

module.exports = Component({
  name: 'View',

  mixins: [Animator],

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
      this.addStyles('inner', {
        clip: `rect(0px, ${this.props.width}px, ${this.props.height}px, -10px)`
      });
    else
      this.addStyles('inner', { boxShadow: 'none' });
  },

  componentWillUpdate() {
    this.setAnimationStyles('inner');
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