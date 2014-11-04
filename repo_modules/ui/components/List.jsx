var React = require('react/addons');
var ReactStyle = require('react-style');
var ListItem = require('./ListItem');
var cx = React.addons.classSet;

require('./List.styl');

var List = React.createClass({
  styles: {
    list: {
      background: '#fff',
      borderTop: '1px solid #c8c7cc',
      borderBottom: '1px solid #c8c7cc',
      margin: '-10px 0 0',
      padding: '0 0 0 10px',
      zIndex: 101,
      fontSize: '16px'
    },

    inset: {
      margin: 20,
      borderRadius: 10
    }
  },

  render() {
    var { className, children, type, styles, liStyle } = this.props;
    var classes = { List: true };
    var listStyles = [this.styles.list, styles];
    if (type) listStyles.push(this.styles[type]);
    classes[className] = !!className;

    return (
      <ul className={cx(classes)} styles={listStyles.map(ReactStyle)}>
        {React.Children.map(children, (li, i) => (
          <ListItem
            key={li.key || i}
            style={liStyle}>
            {li.content || li}
          </ListItem>
        ))}
      </ul>
    );
  }
});

module.exports = List;