var React = require('react');

var Menu = React.createClass({

  render() {
    return (
      <div id="menu">
        {this.props.children}
      </div>
    );
  }
});

module.exports = Menu;