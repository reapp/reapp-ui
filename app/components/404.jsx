/** @jsx React.DOM */
var ReactorPage = require('reactor-core').page;

module.exports = ReactorPage.createClass({

  title: '404',

  render: function() {
    return (
      <div>
        <h2>Page Not Found!</h2>
        <p>404</p>
      </div>
    );
  }

 });