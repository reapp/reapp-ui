var React = require('react');
var DraggableView = require('./DraggableView');
var Merge = require('react/lib/merge');

var Drawer = React.createClass({
  render() {
    var defaultProps = {
      className: 'drawer',
      layer: 2, // todo integrate into app state to manage index
      viewProps: Merge({ style: { paddingTop: 0 } }, this.props.style)
    };

    var props = Merge(defaultProps, this.props);
    var DraggableDrawer = DraggableView.bind(this, props);

    return (
      <DraggableDrawer>{this.props.children}</DraggableDrawer>
    );
  }
});

module.exports = Drawer;