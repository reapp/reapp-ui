/** @jsx React.DOM */
var React  = require('react');
var Layout = require('./components/layout');

var Agave = require('agave');
Agave.enable('r');

var App = React.createClass({

  render: function() {
    return (
      <Layout title="hello">
        <this.props.activeRouteHandler />
      </Layout>
    );
  }

});

module.exports = App;