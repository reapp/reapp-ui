var React = require('react');
var DraggableView = require('./DraggableView');

var Drawer = React.createClass({
  render() {
    var defaultProps = {
      className: 'drawer',
      layer: 2, // todo integrate into app state to manage index
      viewProps: Object.assign({}, { style: { paddingTop: 0 } }, this.props.style),
      parents: this.props.parents
    };

    var props = Object.assign({}, defaultProps, this.props);
    var DraggableDrawer = DraggableView.bind(this, props);

    return (
      <DraggableDrawer>{this.props.children}</DraggableDrawer>
    );
  }
});

module.exports = Drawer;