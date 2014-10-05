var React = require('react');
var ReactStyle = require('react-style');
var { AutoLayout, Box } = require('react-gss');

var View = React.createClass({
  styles: ReactStyle({

  }),

  render() {
    return (
      <AutoLayout>
        <Box name="view">
          {this.props.children}
        </Box>
      </AutoLayout>
    );
  }
});

module.exports = View;