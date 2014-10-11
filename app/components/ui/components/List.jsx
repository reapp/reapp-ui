var React = require('react');
var ReactStyle = require('react-style');
var SimpleScroller = require('../helpers/SimpleScroller');
var GSSMixin = require('../../../mixins/GSSMixin');

require('./List.css');

var ListItem = React.createClass({

  styles: {
    list: ReactStyle`
      ignore: me;
      margin: 0;
      padding: 0;
      z-index: 101;
    `,

    listItem: ReactStyle`
      list-style: none;
      padding: 10px;
      padding-bottom: 0;
      margin: 0;
    `,

    listItemContent: ReactStyle`
      border-bottom: 1px solid #c8c7cc;
      padding-bottom: 10px;
    `
  },

  render() {
    return (
      <ul className={this.props.className || "list"} styles={[this.styles.list, this.props.styles]}>
        {React.Children.map(this.props.children, function(li, i) {
          return (
            <li key={i} className="list-item" styles={this.styles.listItem}>
              <div className="list-item-content" styles={this.styles.listItemContent}>
                {li}
              </div>
            </li>
          );
        }.bind(this))}
      </ul>
    );
  }
});

module.exports = ListItem;