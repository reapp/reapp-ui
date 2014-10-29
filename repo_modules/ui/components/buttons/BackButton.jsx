var React = require('react');
var Button = require('../Button');

var BackButton = React.createClass({
  goBack() {
    if (typeof window !== 'undefined')
      window.history.back();
  },

  render() {
    return this.transferPropsTo(
      <Button onClick={this.goBack} type="angle-left">Back</Button>
    );
  }
});

module.exports = BackButton;

