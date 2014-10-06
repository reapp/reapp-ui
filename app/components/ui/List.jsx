var React = require('react');
var ReactStyle = require('react-style');

require('./List.css');

var ListItem = React.createClass({
  render() {
    return (
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
    );
  }
});

module.exports = ListItem;