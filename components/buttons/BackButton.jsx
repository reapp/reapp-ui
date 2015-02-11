var React = require('react');
var Component = require('../../component');
var Button = require('../Button');

module.exports = Component({
  name: 'Button',

  render() {
    var iconProps = Object.assign({
      size: 20,
      name: 'left',
      stroke: 4,
      style: {
        width: 16,
        margin: '0 5px 0 -2px'
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