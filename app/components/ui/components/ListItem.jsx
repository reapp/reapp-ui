var React = require('react');
var ReactStyle = require('react-style');

var ListItem = React.createClass({
  styles: {
    li: ReactStyle({
      'list-style': 'none',
      'padding': '10px',
      'padding-bottom': '0',
      'margin': '0',
    }),

    content: ReactStyle(`
      ignore:me;
      border-bottom: 1px solid #c8c7cc;
      padding-bottom: 10px;
    `)
  },

  render() {
    return this.transferPropsTo(
      <li className="list-item" styles={this.styles.li}>
        <div className="list-item-content" styles={this.styles.content}>
          {this.props.children}
        </div>
      </li>
    );
  }
});

module.exports = ListItem;