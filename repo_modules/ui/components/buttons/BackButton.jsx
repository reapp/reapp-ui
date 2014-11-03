var React = require('react');
var Button = require('../Button');

var BackButton = React.createClass({
  goBack() {
    if (typeof window !== 'undefined')
      window.history.back();
  },

  render() {
    return this.transferPropsTo(
      <Button
        onClick={this.goBack}
        iconProps={{size: 24, type: 'left', style: {width: 18, margin: '0 2px 0 -2px'} }}>
        Back
      </Button>
    );
  }
});

module.exports = BackButton;

