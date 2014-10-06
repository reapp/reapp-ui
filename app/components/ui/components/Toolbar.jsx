var React = require('react');
var ReactStyle = require('react-style');

var Toolbar = React.createClass({
  styles: ReactStyle({
    background: '#fff',
    textAlign: 'center',
    fontSize: '16px',
    borderBottom: '1px solid #ccc',
    padding: '12px',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: '100'
  }),

  render() {
    return (
      <div id={this.props.id || '_toolbar'} class='toolbar' styles={this.styles}>
        <span>{this.props.children}</span>
      </div>
    );
  }
});

module.exports = Toolbar;