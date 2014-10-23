var React = require('react');
var Merge = require('react/lib/merge');
var Drawer = require('./Drawer');
var View = require('./View');
var TitleBar = require('../components/TitleBar');
var BackButton = require('../components/buttons/BackButton');

// High level view that combines a drawer with a simple view

var DrawerView = React.createClass({
  render() {
    var props = this.props;
    var id = props.id;
    var left = props.titleLeft || <BackButton />;
    var right = props.titleRight;
    var title = props.title;
    var parents = props.parents;

    return (
      <Drawer id={id} parents={parents}>
        <TitleBar left={left} right={right}>
          {title}
        </TitleBar>
        <View>
          {props.children}
        </View>
      </Drawer>
    );
  }
});

module.exports = DrawerView;