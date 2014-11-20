var React = require('react/addons');
var Styled = require('ui/styled');
var View = require('./View');
var TitleBar = require('../components/TitleBar');
var cx = React.addons.classSet;

var ViewLeft = React.createClass({
  mixins: [Styled('viewleft')],

  render() {
    var { className, children, title, ...props } = this.props;
    var classes = { ViewLeft: true };
    classes[className] = !!className;

    return (
      <div {...props}
        styles={this.getStyles()}>
        {title && <TitleBar>{title}</TitleBar>}
        <View className={cx(classes)}>{children}</View>
      </div>
    );
  }
});

module.exports = ViewLeft;