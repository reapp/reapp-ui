var React = require('react');
var ViewList = require('./ViewList');

module.exports = React.createClass({
  render() {
    var width = this.props.width || window.innerWidth;
    var props = Object.assign({
      transform: 'VIEW_PARALLAX',
      touchStartBounds: {
        // touchable only on the edges
        x: [
          { from: 0, to: 10 },
          { from: width-10, to: width }
        ]
      }
    }, this.props);

    return (
      <ViewList {...props} />
    );
  }
});