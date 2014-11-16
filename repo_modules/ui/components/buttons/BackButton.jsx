var React = require('react');
var Button = require('../Button');

var BackButton = module.exports = React.createClass({
  goBack() {
    if (typeof window !== 'undefined')
      window.history.back();
  },

  render() {
    var iconProps = {
      size: 18,
      type: 'left',
      stroke: 2,
      style: {
        width: 16,
        margin: '0 2px 0 -4px'
      }
    };

    return (
      <Button
        {...this.props}
        onClick={this.goBack}
        iconProps={iconProps}>
        Back
      </Button>
    );
  }
});