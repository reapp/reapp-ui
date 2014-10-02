var React = require('react');
var ReactStyle = require('react-style');
var { Link } = require('react-router');

module.exports = React.createClass({

  styles: ReactStyle({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    background: '#fff',
    textAlign: 'center',
    fontSize: '16px',
    borderBottom: '1px solid #ccc',
    padding: '12px',
    zIndex: '100'
  }),

  render() {
    return (
      <div class='toolbar' styles={this.styles}>
        <Link to="app">Home</Link>
        <Link to="viewer">Gallery</Link>
        <span>{this.props.children}</span>
      </div>
    );
  }

});