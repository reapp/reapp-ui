var React  = require('react');
var Layout = require('./components/layout');
var Agave = require('agave');
var Routes = require('./routes');
var TouchEvents = require('./components/ui/lib/TouchEvents');
var ReactStyle = require('react-style');
var DocumentTitle = require('react-document-title');

window.React = React;

Agave.enable('r');
ReactStyle.inject();
TouchEvents.initialize();

var App = React.createClass({
  render() {
    return (
      <DocumentTitle title="React Base">
        <Layout>
          {this.props.activeRouteHandler()}
        </Layout>
      </DocumentTitle>
    );
  }
});

module.exports = Routes.init(App);