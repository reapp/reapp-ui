var React = require('react');
var ReactStyle = require('react-style');
var { Box } = require('react-gss');

var Toolbar = React.createClass({
  styles: ReactStyle({
    background: '#fff',
    textAlign: 'center',
    fontSize: '16px',
    borderBottom: '1px solid #ccc',
    padding: '12px',
    position: 'relative',
    zIndex: '100'
  }),

  render() {
    return (
      <Box
        top="this.top"
        left="this.left"
        right="this.right"
        height="this.instrinsicHeight"
      >
        <div id={this.props.id || '_toolbar'} class='toolbar' styles={this.styles}>
          <span>{this.props.children}</span>
        </div>
      </Box>
    );
  }
});

module.exports = Toolbar;