/** @jsx React.DOM */
var React = require('react');

if (typeof window !== 'undefined') {
  window.GSS_CONFIG = {
    worker: "/bower/gss/dist/worker.js"
  };
}

module.exports = React.createClass({

  render: function() {
    return (
      <div id="layout">
        {this.props.children}
      </div>
    );
  }

});