var React = require('react');
var ViewComponent = require('ui/viewcomponent');
var TitleBar = require('../components/TitleBar');
var StaticContainer = require('../helpers/StaticContainer');
var AcceptsContexts = require('../mixins/AcceptsContexts');

module.exports = ViewComponent('View', {
  mixins: [AcceptsContexts('viewList')],

  childContextTypes: {
    viewList: React.PropTypes.object
  },

  getChildContext() {
    return {
      viewList: Object.assign({}, this.context.viewList,
        { index: this.props.viewList.index  })
    };
  },

  render() {
    var {
      children,
      title,
      animations,
      viewList,
      width,
      height,
      containerProps,
      titleBarProps,
      ...props
    } = this.props;

    if (viewList.index === viewList.step)
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
          <TitleBar {...titleBarProps} viewList={viewList}>{title}</TitleBar>
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