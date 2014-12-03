var ViewComponent = require('ui/viewcomponent');
var TitleBar = require('../components/TitleBar');

module.exports = ViewComponent('View', {
  render() {
    var { children, title, transform, index, width, containerProps, ...props } = this.props;

    return (
      <div {...containerProps} {...this.componentProps()}>
        {title && (
          <TitleBar index={index}>{title}</TitleBar>
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