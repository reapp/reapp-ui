var React = require('react');
var DraggableView = require('./DraggableView');
var Merge = require('react/lib/merge');

var Drawer = React.createClass({
  render() {
    var DraggableDrawer = DraggableView.bind(this,
      Merge({
        className: 'drawer',
        layer: 2, // todo integrate into app state to manage index
        viewProps: Merge({ style: { paddingTop: 0 } }, this.props.style)
      }, this.props)
    );

    return (
      <DraggableDrawer>{this.props.children}</DraggableDrawer>
    );
  }
});

module.exports = Drawer;