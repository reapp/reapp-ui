var ViewComponent = require('ui/viewcomponent');

module.exports = ViewComponent('View', {
  getDefaultProps() {
    return {
      top: 44
    };
  },

  render() {
    var { children, top, ...props } = this.props;

    console.log('this zindex', this.context.zIndex);

    if (top !== 44) {
      this.addStyles({ top: top });
    }

    return (
      <div {...props} {...this.componentProps()}>
        {children}
      </div>
    );
  }
});