var React = require('react');
var ViewComponent = require('ui/viewcomponent');
var TitleBar = require('../components/TitleBar');
var StaticContainer = require('../helpers/StaticContainer');
var AcceptsAnimation = require('../mixins/AcceptsAnimation');

module.exports = ViewComponent('View', {
  mixins: [AcceptsAnimation('viewList')],

  childContextTypes: {
    viewListIndex: React.PropTypes.number
  },

  getChildContext() {
    return { viewListIndex: this.props.viewListindex };
  },

  render() {
    var {
      children,
      title,
      animations,
      viewListIndex,
      viewListStep,
      width,
      height,
      containerProps,
      titleBarProps,
      ...props
    } = this.props;

    if (viewListIndex === viewListStep)
      this.addStyles({ pointerEvents: 'all' });

    // add offset from titlebar
    var titleBarHeight = titleBarProps && titleBarProps.height;
    if (!titleBarHeight && title)
      titleBarHeight = this.getConstant('titleBarHeight');

    if (titleBarHeight)
      this.addStyles('inner', { top: titleBarHeight });

    // clip box shadow for titlebar
    if (this.isAnimating('viewList'))
      this.addStyles('inner', { clip: `rect(0px, ${width}px, ${height}px, -10px)` });
    else
      this.addStyles('inner', { boxShadow: 'none' });

    return (
      <div {...containerProps} {...this.componentProps()}>
        {title && (
          <TitleBar {...titleBarProps} viewListIndex={viewListIndex}>{title}</TitleBar>
        )}
        <div {...props} {...this.componentProps('inner')}
          style={this.getAnimationStyles(animations)}>
          <StaticContainer shouldUpdate={this.getAnimationStep('viewList') % 1 === 0}>
            {children}
          </StaticContainer>
        </div>
      </div>
    );
  }
});