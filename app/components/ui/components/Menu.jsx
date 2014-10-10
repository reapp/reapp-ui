var React = require('react');
var ReactStyle = require('react-style');
var GSSMixin = require('../../../mixins/GSSMixin');
var List = require('./List');

require('./Menu.css')

var Menu = React.createClass({
  mixins: [GSSMixin],

  layout: `
    _[top] == ::window[top];
    _[left] == ::window[left];
    _[bottom] == ::window[bottom];
    _[width] == 200;
  `,

  styles: ReactStyle`
    ignore: me;
    background: #fff;
    border: 10px solid #000;
    position: relative;
    z-index: 101;
    list-style: none;
    margin: 0;
    padding: 0;
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