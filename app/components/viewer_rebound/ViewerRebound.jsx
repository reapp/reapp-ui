var React = require('react');
var { ReboundScroller } = require('../ui/lib/animate/ReboundScroller');

require('./ViewerRebound.css');

var ViewerRebound = React.createClass({
  render() {
    var content = [];

    for (var i = 0; i < 100; i++) {
      content.push(<li key={i}>Item {i}</li>);
    }

    return (
      <ReboundScroller className="ScrollPage" options={{scrollingX: false}}>
        <ul className="ScrollPage-content">{content}</ul>
      </ReboundScroller>
    );
  }
});

module.exports = ViewerRebound;