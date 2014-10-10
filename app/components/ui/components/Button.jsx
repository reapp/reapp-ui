var React = require('react');
var ReactStyle = require('react-style');
var Icon = require('./Icon');

var Button = React.createClass({
  styles: ReactStyle`
    ignore: me;
    padding-top: 8px;
    width: 40px;
    height: 40px;
    display: block;
    color: #fff;
    position: absolute;
    text-align: center;
    top: 0;
    left: 0;
    z-index: 102;
  `,

  render() {
    return (
      <a href="#" styles={this.styles} className={'button-' + this.props.type}>
        <Icon type={this.props.type} size="2x" />
      </a>
    );
  }
});

module.exports = Button;