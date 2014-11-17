var React = require('react');
var ReactStyle = require('react-style');
var List = require('./List');

require('./Menu.styl');

var Menu = React.createClass({
  styles: {
    background: '#000',
    border: '10px solid #000',
    position: 'absolute',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    width: '100%',
    height: '100%'
  },

  render() {
    var liProps = {
      styles: {
        children: { color: '#fff' }
      }
    };

    return (
      <List className="menu" styles={this.styles} liProps={liProps}>
        {this.props.children}
      </List>
    );
  }
});

module.exports = Menu;