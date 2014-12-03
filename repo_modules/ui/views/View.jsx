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
      width,
      containerProps,
      titleBarProps,
      ...props
    } = this.props;

    if (!title)
      this.addStyles('inner', { top: 0 });

    if (animation)
      this.addStyles('inner', this.getAnimationStyles(animation));

    return (
      <div {...containerProps} {...this.componentProps()}>
        {title && (
          <TitleBar {...titleBarProps} index={index}>{title}</TitleBar>
        )}
        <div {...props} {...this.componentProps('inner')}>
          <StaticContainer shouldUpdate={this.getAnimationStep() % 1 === 0}>
            {children}
          </StaticContainer>
        </div>
      </div>
    );
  }
});