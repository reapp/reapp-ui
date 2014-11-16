var React = require('react/addons');
var ReactStyle = require('react-style');
var View = require('./View');
var TitleBar = require('../components/TitleBar');
var cx = React.addons.classSet;

var ViewLeft = React.createClass({
  render() {
    var { className, children, title } = this.props;
    var classes = { ViewLeft: true };
    classes[className] = !!className;

    return (
      <div>
        {title && <TitleBar>{title}</TitleBar>}
        <View className={cx(classes)}>{children}</View>
      </div>
    );
  }
});

module.exports = ViewLeft;