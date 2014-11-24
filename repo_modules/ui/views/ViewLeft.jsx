var Component = require('ui/component');
var View = require('./View');
var TitleBar = require('../components/TitleBar');

var ViewLeft = Component('viewLeft', {
  render() {
    var { children, title, ...props } = this.props;

    return (
      <div {...this.getStyles()}>
        {title && <TitleBar>{title}</TitleBar>}
        <View top={0} {...props} className={this.getClasses()}>{children}</View>
      </div>
    );
  }
});

module.exports = ViewLeft;