/** @jsx React.DOM */
var React = require('react');

module.exports = React.createClass({

  title: 'Home',

  getInitialState: function() {
    return { writing: { content: 'Hello World' } };
  },

  render: function() {
    return (
      <div>
        <h1>Home</h1>
        <div>
          {this.state.writing[0].content}
        </div>
      </div>
    );
  }

});