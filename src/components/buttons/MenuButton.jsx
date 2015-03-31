var React = require('react');
var Component = require('../../component');
var Button = require('../Button');

module.exports = Component({
  name: 'Button',

  goBack() {
    if (typeof window !== 'undefined')
      window.history.back();
  },

  render() {
    return (
      <Button
        {...this.props}
        onClick={this.goBack}
        iconProps={{size: 24, type: 'left', style: {width: 18, margin: '0 2px 0 -2px'} }}>
      </Button>
    );
  }
});