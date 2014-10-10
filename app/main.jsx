var React  = require('react');
var Layout = require('./components/layout');
var Routes = require('./routes');
var TouchEvents = require('./components/ui/lib/TouchEvents');
var ReactStyle = require('react-style');
var DocumentTitle = require('react-document-title');
var { Flux } = require('./flux');

window.React = React;
ReactStyle.inject();
TouchEvents.initialize();

// App
var App = React.createClass({
  render() {
    return (
      <DocumentTitle title="React Base">
        <Layout>
          {this.props.activeRouteHandler({ flux: Flux })}
        </Layout>
      </DocumentTitle>
    );
  }
});

var RoutedApp = Routes.init(App);

module.exports = {
  start(env, opts) {
    return (env === 'dev') ?
      React.renderComponent(RoutedApp, document.body) :
      React.renderComponentToString(RoutedApp());
  }
};