var React = require('react');
var Drawer = require('./Drawer');
var View = require('./View');

// High level view that combines a drawer with a simple view

var DrawerView = React.createClass({
  render() {
    return this.transferPropsTo(
      <Drawer>
        <View>
          {this.props.children}
        </View>
      </Drawer>
    );
  }
});

module.exports = DrawerView;