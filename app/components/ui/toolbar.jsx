var React = require('react');

module.exports = React.createClass({

  style: {
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
  },

  render() {
    return (
      <div class="toolbar" style={this.style}>
        {this.props.children}
      </div>
    );
  }

});