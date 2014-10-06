var React = require('react');
var ReactStyle = require('react-style');
var { AutoLayout, Box } = require('react-gss');

var View = React.createClass({
  styles: ReactStyle({

  }),

  render() {
    return this.transferPropsTo(
      <AutoLayout
        top="window[top]"
        bottom="window[bottom]"
        left="window[left]"
        right="window[right]">

        <Box name="view">
          {this.props.children}
        </Box>

      </AutoLayout>
    );
  }
});

module.exports = View;