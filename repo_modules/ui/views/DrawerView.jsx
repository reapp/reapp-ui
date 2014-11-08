var React = require('react');
var Drawer = require('./Drawer');
var View = require('./View');
var TitleBar = require('../components/TitleBar');

// High level view that combines a drawer with a simple view

var DrawerView = React.createClass({
  render() {
    var { title, styles, ...props } = this.props;

    return (
      <Drawer {...props}>
        {title && TitleBar(null, title)}
        <View styles={styles}>
          {this.props.children}
        </View>
      </Drawer>
    );
  }
});

module.exports = DrawerView;