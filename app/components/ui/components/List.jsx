var React = require('react');
var ReactStyle = require('react-style');
var SimpleScroller = require('../helpers/SimpleScroller');
var GSSMixin = require('../../../mixins/GSSMixin');

require('./List.css');

var ListItem = React.createClass({
  mixins: [GSSMixin],

  layout: `
    [top] == parent[top];
  `,

  styles: {
    list: ReactStyle`
      background: #fff;
      border-bottom: 1px solid #c8c7cc;
      margin: 0;
      padding: 0;
    `
  },

  render() {
    return (
      <SimpleScroller options={{scrollingX: false}}>
        <ul className="list">
          {this.props.children.map(li => (
            <li className="list-item">
              <div className="list-item-content">
                {li}
              </div>
            </li>
          ))}
        </ul>
      </SimpleScroller>
    );
  }
});

module.exports = ListItem;