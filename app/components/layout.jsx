/** @jsx React.DOM */
var React = require('react');

module.exports = React.createClass({

  render() {
    return (
      <div id='layout'>
        {this.props.children}
      </div>
    );
  }

});