var React = require('react/addons');
var Merge = require('react/lib/merge');
var ReactStyle = require('react-style');
var View = require('./View');
var cx = React.addons.classSet;

var ViewLeft = React.createClass({
  render() {
    var props = this.props;
    var classes = { ViewLeft: true };
    classes[props.className] = !!props.className;

    return (
      <View className={cx(classes)}>{this.props.children}</View>
    );
  }
});

module.exports = ViewLeft;