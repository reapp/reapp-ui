var React = require('react');
var Styled = require('ui/styled');
var List = require('./List');

var Menu = React.createClass({
  mixins: [Styled('menu')],

  render() {
    var liProps = {
      noicon: true,
      styles: {
        self: { border: 'none' },
        children: { color: '#fff' }
      }
    };

    return (
      <List
        className="menu"
        styles={this.getStyles()}
        liProps={liProps}>
        {this.props.children}
      </List>
    );
  }
});

module.exports = Menu;