var React = require('react');
var Component = require('../../component');
var Button = require('../Button');

var iconProps = {
  size: 20,
  file: require('../../assets/icons/left.svg'),
  stroke: 4,
  styles: {
    self: {
      margin: 'auto 2px auto -2px'
    }
  }
};

module.exports = React.createClass({
  render() {
    var instanceIconProps = Object.assign({}, iconProps, this.props.iconProps);

    return (
      <Button
        {...this.props}
        iconProps={instanceIconProps}
        chromeless>
        {this.props.children || 'Back'}
      </Button>
    );
  }
});