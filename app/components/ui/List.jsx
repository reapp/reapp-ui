var React = require('react');
var ReactStyle = require('react-style');
var SimpleScroller = require('./SimpleScroller');
var { Box } = require('react-gss');

require('./List.css');

var ListItem = React.createClass({
  render() {
    return (
      <Box name="list" top="toolbar[bottom] + 20">
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
      </Box>
    );
  }
});

module.exports = ListItem;