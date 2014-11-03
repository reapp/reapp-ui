var React = require('react/addons');
var ReactStyle = require('react-style');
var cx = React.addons.classSet;

require('./ListItem.styl');

var ListItem = React.createClass({
  styles: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    overflow: 'hidden'
  },

  render() {
    var classes = { 'ListItem': true };
    classes[this.props.className] = !!this.props.className;

    return (
      <li className={cx(classes)} styles={[this.styles, this.props.style].map(ReactStyle)}>
        {this.props.children}
      </li>
    );
  }
});

module.exports = ListItem;