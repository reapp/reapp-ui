var React = require('react');
var Merge = require('react/lib/merge');
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

    var props = Merge(parallaxProps, this.props);
    return ViewList(props);
  }
});

module.exports = DottedViewList;