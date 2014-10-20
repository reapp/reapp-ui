var React = require('react/addons');
var ReactStyle = require('react-style');

var ListItem = React.createClass({
  styles: {
    li: ReactStyle({
      listStyle: 'none',
      margin: 0,
      padding: 0
    }),

    content: {
      borderBottom: '1px solid #c8c7cc',
      padding: '10px 0',
    }
  },

  render() {
    return this.transferPropsTo(
      <li className="list-item" styles={this.styles.li}>
        {React.Children.map(this.props.children, child => (
          React.addons.cloneWithProps(child, {style: this.styles.content})
        ))}
      </li>
    );
  }
});

module.exports = ListItem;