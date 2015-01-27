var React = require('react');
var Component = require('../component');
var List = require('./List');

module.exports = Component({
  name: 'Menu',

  render() {
    var liProps = {
      noicon: true,
      styles: {
        self: { border: 'none' },
        children: { color: '#fff' }
      }
    };

    return (
      <List {...this.componentProps()} liProps={liProps} {...this.props}>
        {this.props.children}
      </List>
    );
  }
});
