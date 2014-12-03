var ViewComponent = require('ui/viewcomponent');
var TitleBar = require('../components/TitleBar');

module.exports = ViewComponent('View', {
  render() {
    var {
      children,
      title,
      transform,
      index,
      width,
      containerProps,
      titleBarProps,
      ...props
    } = this.props;

    if (!title)
      this.addStyles('inner', { top: 0 });

    return (
      <div {...containerProps} {...this.componentProps()}>
        {title && (
          <TitleBar {...titleBarProps} index={index}>{title}</TitleBar>
        )}
        <div {...props} {...this.componentProps('inner')}
          data-transform={transform}
          data-transform-index={index}
          data-width={width}>
          {children}
        </div>
      </div>
    );
  }
});