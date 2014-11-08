var React = require('react');
var DraggableView = require('./DraggableView');

/* Binding drawer specific stuff to draggableview */

var Drawer = React.createClass({
  getDefaultProps() {
    return {
      className: 'drawer',
      layer: 2, // todo integrate w/ app state & manage index
      viewProps: { style: { paddingTop: 0 } }
    };
  },

  render() {
    var { children, ...props } = this.props;

    return (
      <DraggableView {...props}>{children}</DraggableView>
    );
  }
});

module.exports = Drawer;