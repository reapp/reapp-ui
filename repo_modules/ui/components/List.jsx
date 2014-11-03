var React = require('react/addons');
var ReactStyle = require('react-style');
var ListItem = require('./ListItem');
var cx = React.addons.classSet;

require('./List.styl');

var List = React.createClass({
  styles: {
    background: '#fff',
    borderTop: '1px solid #c8c7cc',
    borderBottom: '1px solid #c8c7cc',
    margin: '-10px 0 0',
    padding: '0 0 0 10px',
    zIndex: 101,
  },

  render() {
    var classes = { List: true };
    classes[this.props.className] = !!this.props.className;

    return (
      <ul className={cx(classes)} styles={[this.styles, this.props.style].map(ReactStyle)}>
        {React.Children.map(this.props.children, (li, i) => (
          <ListItem
            key={li.key || i}
            style={this.props.liStyle}>
            {li.content || li}
          </ListItem>
        ))}
      </ul>
    );
  }
});

module.exports = List;