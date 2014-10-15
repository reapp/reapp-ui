var React = require('react');
var ReactStyle = require('react-style');
var ListItem = require('./ListItem');

var List = React.createClass({
  styles: {
    list: ReactStyle({
      margin: 0,
      padding: 10,
      zIndex: 101,
    }),
  },

  render() {
    return (
      <ul className={this.props.className || "list"} styles={[this.styles.list, this.props.styles]}>
        {React.Children.map(this.props.children, (li, i) => {
          return <ListItem key={li.key || i}>{li.content || li}</ListItem>
        })}
      </ul>
    );
  }
});

module.exports = List;