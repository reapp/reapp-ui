var React = require('react/addons');

require('./Icon.css');
var cx = React.addons.classSet;

var Icon = React.createClass({
  render() {
    var style = {
      color: this.props.color || null
    };

    var classes = {};
    classes['icon-' + this.props.size] = !!this.props.size;
    classes['ios-icon-' + this.props.type] = true;

    return this.transferPropsTo(
      <span className={cx(classes)} style={style}></span>
    );
  }

});

module.exports = Icon;