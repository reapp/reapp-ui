var React = require('react');
var Component = require('../component');
var View = require('./View');
var Drawer = require('../components/Drawer');
var TitleBar = require('../components/TitleBar');

// High level view that combines a drawer with a simple view

var DrawerView = Component({
  name: 'DrawerView',

  render() {
    var { title, viewProps, ...props } = this.props;

    return (
      <Drawer {...props}>
        {title && <TitleBar>{title}</TitleBar>}
        <View {...viewProps}>
          {this.props.children}
        </View>
      </Drawer>
    );
  }
});

module.exports = DrawerView;