var React = require('react');
var Component = require('../../component');
var Button = require('../Button');

module.exports = Component({
  name: 'Button',

  render() {
    var iconProps = Object.assign({
      size: 20,
      file: require('../../assets/icons/left.svg'),
      stroke: 4,
      styles: {
        self: {
          margin: '0 2px 0 -2px'
        }
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