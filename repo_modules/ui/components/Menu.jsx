var Component = require('ui/component');
var List = require('./List');

module.exports = Component('Menu', {
  render() {
    var liProps = {
      noicon: true,
      styles: {
        self: { border: 'none' },
        children: { color: '#fff' }
      }
    };

    return (
      <List {...this.componentProps()} liProps={liProps}>
        {this.props.children}
      </List>
    );
  }
});