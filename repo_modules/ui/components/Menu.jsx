var React = require('react');
var Styled = require('ui/styled');
var List = require('./List');

require('./Menu.styl');

var Menu = React.createClass({
  mixins: [Styled('menu')],

  render() {
    var liProps = {
      styles: {
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