var Component = require('ui/component');

var ListTitle = Component('listtitle', {
  render() {
    var { children, ...props } = this.props;

    return (
      <h3 {...props} {...this.componentProps()}>
        {children}
      </h3>
    );
  }
});

module.exports = ListTitle;