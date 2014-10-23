var React = require('react/addons');
var ReactStyle = require('react-style');

require('./ListItem.styl');

var ListItem = React.createClass({
  styles: {
    li: ReactStyle({
      listStyle: 'none',
      margin: 0,
      padding: 0
    })
  },

  render() {
    return this.transferPropsTo(
      <li className="list-item" styles={this.styles.li}>
        <div className="list-item__content">
          {this.props.children}
        </div>
      </li>
    );
  }
});

module.exports = ListItem;