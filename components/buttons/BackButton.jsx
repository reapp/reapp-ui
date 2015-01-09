var React = require('react');
var Button = require('../Button');

var BackButton = module.exports = React.createClass({
  // because were shimming a button
  statics: {
    isButton: true
  },

  render() {
    var iconProps = Object.assign({
      shapeRendering: 'crispEdges',
      size: 18,
      name: 'left',
      stroke: 2,
      style: {
        width: 16,
        margin: '0 2px 0 -4px'
      }
    }, this.props.iconProps);

    return (
      <Button
        {...this.props}
        iconProps={iconProps}
        chromeless>
        {this.props.children || 'Back'}
      </Button>
    );
  }
});