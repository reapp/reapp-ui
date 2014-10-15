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
    var children = React.Children.map(this.props.children, (child) => {
      return React.addons.cloneWithProps(child, {style: this.styles.content});
    });

    return this.transferPropsTo(
      <li className="list-item" styles={this.styles.li}>
        {children}
      </li>
    );
  }
});

module.exports = ListItem;