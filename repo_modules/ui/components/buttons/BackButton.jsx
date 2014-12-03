var React = require('react');
var Button = require('../Button');

var BackButton = module.exports = React.createClass({
  statics: {
    isButton: true
  },

  goBack() {
    if (typeof window !== 'undefined')
      window.history.back();
  },

  render() {
    var iconProps = Object.assign({
      shapeRendering: 'crispEdges',
      size: 18,
      type: 'left',
      stroke: 2,
      style: {
        width: 16,
        margin: '0 2px 0 -4px'
      }
    }, this.props.iconProps);

    return (
      <Button
        {...this.props}
        onClick={this.goBack}
        iconProps={iconProps}
        borderless>
        Back
      </Button>
    );
  }
});