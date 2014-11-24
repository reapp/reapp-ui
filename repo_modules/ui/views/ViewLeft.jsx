var Component = require('ui/component');
var View = require('./View');
var TitleBar = require('../components/TitleBar');

var ViewLeft = Component('viewleft', {
  render() {
    var { children, title, ...props } = this.props;

    return (
      <div {...props} {...this.getStyles()}>
        {title && <TitleBar>{title}</TitleBar>}
        <View className={this.getClasses()}>{children}</View>
      </div>
    );
  }
});

module.exports = ViewLeft;