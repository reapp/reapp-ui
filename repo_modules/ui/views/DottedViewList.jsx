var React = require('react');
var ViewList = require('./ViewList');

var DottedViewList = React.createClass({
  render() {
    var width = this.props.width || window.innerWidth;
    var parallaxProps = {
      transform: 'VIEW_SIDE_BY_SIDE',
      touchStartBounds: {
        // exclude left edge
        x: { from: 10, to: width }
      }
    };

    var props = Object.assign({}, parallaxProps, this.props);
    return ViewList(props);
  }
});

module.exports = DottedViewList;