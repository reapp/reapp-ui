var React = require('react');
var Component = require('../component');
var List = require('./List');

module.exports = Component({
  name: 'Menu',

  render() {
    var itemProps = {
      noicon: true,
      styles: {
        self: { border: 'none' },
        children: { color: '#fff' }
      }
    };

    return (
      <List {...this.componentProps()} itemProps={itemProps} {...this.props}>
        {this.props.children}
      </List>
    );
  }
});
