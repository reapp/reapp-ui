var React = require('react');
var Component = require('../../component');
var Button = require('../Button');

module.exports = Component({
  name: 'Button',

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
        styles={{self: { color: this.getConstant('brandColor') }}}
        chromeless>
        {this.props.children || 'Back'}
      </Button>
    );
  }
});