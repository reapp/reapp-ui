var ViewComponent = require('ui/viewcomponent');

module.exports = ViewComponent('ViewMain', {
  render() {
    var { children, hasChild, ...props } = this.props;

    if (!children)
      this.addStyles(this.styles.childless);

    this.addStyles({
      zIndex: this.getStyleVal('zIndex') + 1
    })

    return (
      <div {...props} {...this.componentProps()}>
        {children}
      </div>
    );
  }
});