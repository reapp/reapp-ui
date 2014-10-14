var React = require('react/addons');
var ReactStyle = require('react-style');

// require('./Icon.css');
var cx = React.addons.classSet;

var Icon = React.createClass({
  styles: ReactStyle`
    ignore: me;
    color: #000;
  `,

  render() {
    var classes = {};

    classes['icon-' + this.props.size] = !!this.props.size;
    classes['ios-icon-' + this.props.type] = true;

    return (
      <span className={cx(classes)} styles={this.styles}></span>
    );
  }

});

module.exports = Icon;