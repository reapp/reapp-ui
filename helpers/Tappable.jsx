var React = require('react');
var Tappable = require('../mixins/Tappable');

module.exports = React.createClass({
  mixins: [
    Tappable
  ],

  render() {
    return <span {...this.tappableProps()} {...this.props} />;
  }
})