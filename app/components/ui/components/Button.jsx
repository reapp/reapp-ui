var React = require('react');
var ReactStyle = require('react-style');

var Button = React.createClass({
  styles: ReactStyle`
    ignore: me;
    background: #000;
    border: 1px solid #000;
    width: 40px;
    height: 40px;
    display: block;
    color: #fff;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 102;
  `,

  render() {
    return (
      <a href="#" styles={this.styles} className={'button-' + this.props.type}></a>
    );
  }
});

module.exports = Button;