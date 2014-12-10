var Component = require('ui/component');

module.exports = Component({
  name: 'Title',

  render() {
    var { children, ...props } = this.props;

    return (
      <h3 {...props} {...this.componentProps()}>
        {children}
      </h3>
    );
  }
});