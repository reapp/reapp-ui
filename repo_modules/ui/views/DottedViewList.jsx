var React = require('react');
var ViewList = require('./ViewList');
var Dots = require('../components/Dots');

var DottedViewList = React.createClass({
  getInitialState() {
    return { activeViewIndex: 0 };
  },

  render() {
    var width = this.props.width || window.innerWidth;
    var dottedViewProps = Object.assign({
      titleBarProps: {
        height: 48,
        styles: {
          mid: {
            position: 'relative',
            top: -4
          }
        }
      },
      width: width,
      transform: 'VIEW_SIDE_BY_SIDE',
      touchStartBounds: {
        x: {
          from: 10, // exclude left edge
          to: width
        }
      }
    }, this.props);

    dottedViewProps.handleViewEnter = function(index) {
      if (dottedViewProps.handleViewEnter)
        dottedViewProps.handleViewEnter(index);

      this.setState({ activeViewIndex: index });
    };

    return (
      <div className="DottedViewList">
        <ViewList {...dottedViewProps} />
        <Dots total={this.props.views.length} active={this.state.activeViewIndex} />
      </div>
    );
  }
});

module.exports = DottedViewList;