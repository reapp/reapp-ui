var React = require('react');
var ReactStyle = require('react-style');

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
      <div class="toolbar" styles={this.styles}>
        {this.props.children}
      </div>
    );
  }

});