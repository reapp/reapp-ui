var React = require('react');
var ViewComponent = require('ui/viewcomponent');
var TitleBar = require('../components/TitleBar');
var StaticContainer = require('../helpers/StaticContainer');

module.exports = ViewComponent('View', {
  childContextTypes: {
    index: React.PropTypes.number
  },

  getChildContext() {
    return { index: this.props.index };
  },

  render() {
    var {
      children,
      title,
      animation,
      index,
      step,
      width,
      height,
      containerProps,
      titleBarProps,
      ...props
    } = this.props;

    if (index === step)
      this.addStyles({ pointerEvents: 'all' });

    // add offset from titlebar
    var titleBarHeight = titleBarProps && titleBarProps.height;
    if (!titleBarHeight && title)
      titleBarHeight = this.getConstant('titleBarHeight');

    if (titleBarHeight)
      this.addStyles('inner', { top: titleBarHeight });

    // clip box shadow for titlebar
    if (this.isAnimating())
      this.addStyles('inner', { clip: `rect(0px, ${width}px, ${height}px, -10px)` });
    else
      this.addStyles('inner', { boxShadow: 'none' });

    return (
      <div {...containerProps} {...this.componentProps()}>
        {title && (
          <TitleBar {...titleBarProps} index={index}>{title}</TitleBar>
        )}
        <div {...props} {...this.componentProps('inner')}
          style={this.getAnimationStyles(animation)}>
          <StaticContainer shouldUpdate={this.getAnimationStep() % 1 === 0}>
            {children}
          </StaticContainer>
        </div>
      </div>
    );
  }
});