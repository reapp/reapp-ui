var React = require('react');
var Button = require('../Button');

var BackButton = module.exports = React.createClass({
  goBack() {
    if (typeof window !== 'undefined')
      window.history.back();
  },

  render() {
    var iconProps = {
      size: 24,
      type: 'left',
      stroke: 4,
      style: {
        width: 18,
        margin: '0 4px 0 -4px'
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