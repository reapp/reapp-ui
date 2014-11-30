var ViewComponent = require('ui/viewcomponent');

module.exports = ViewComponent('ViewMain', {
  render() {
    var { children, hasChild, ...props } = this.props;

    if (!children)
      this.addStyles(this.styles.childless);

    return (
      <div {...props} {...this.componentProps()}>
        {children}
      </div>
    );
  }
});