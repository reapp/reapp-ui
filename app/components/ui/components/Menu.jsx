var React = require('react');
var ReactStyle = require('react-style');
var GSSMixin = require('../../../mixins/GSSMixin');
var List = require('./List');

// require('./Menu.css')

var Menu = React.createClass({
  styles: ReactStyle`
    ignore: me;
    background: #000;
    border: 10px solid #000;
    position: relative;
    list-style: none;
    margin: 0;
    padding: 0;
    height: 100%;
  `,

  render() {
    return (
      <List className="menu" styles={this.styles}>
        {this.props.children}
      </List>
    );
  }
});

module.exports = Menu;