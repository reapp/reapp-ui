var React = require('react');
var ReactStyle = require('react-style');
var GSSMixin = require('../../../mixins/GSSMixin');
var List = require('./List');

require('./Menu.styl');

var Menu = React.createClass({
  styles: ReactStyle({
    background: '#000',
    border: '10px solid #000',
    position: 'absolute',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    width: '100%',
    height: '100%'
  }),

  render() {
    return (
      <List className="menu" styles={this.styles}>
        {this.props.children}
      </List>
    );
  }
});

module.exports = Menu;