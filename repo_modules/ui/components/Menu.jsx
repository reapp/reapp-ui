var Component = require('ui/component');
var List = require('./List');

var Menu = Component('menu', {
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

module.exports = Menu;