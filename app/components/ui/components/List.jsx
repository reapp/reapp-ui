var React = require('react');
var ReactStyle = require('react-style');
var SimpleScroller = require('../helpers/SimpleScroller');

require('./List.css');

var ListItem = React.createClass({
  render() {
    return (
      <SimpleScroller options={{scrollingX: false}}>
        <ul className="list">
          {this.props.children.map(function(li) {
            return (
              <li className="list-item">
                <div className="list-item-content">
                  {li}
                </div>
              </li>
            );
          })}
        </ul>
      </SimpleScroller>
    );
  }
});

module.exports = ListItem;