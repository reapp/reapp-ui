var React  = require('react');
var Layout = require('./components/layout');
var Routes = require('./routes');
var TouchEvents = require('./components/ui/lib/TouchEvents');
var ReactStyle = require('react-style');
var DocumentTitle = require('react-document-title');
var { Flux } = require('./flux');
var GSSMixin = require('./mixins/GSSMixin');

window.React = React;
ReactStyle.inject();
TouchEvents.initialize();

// App
var App = React.createClass({
  componentDidMount() {
    GSSMixin._start();
  },

  render() {
    return (
      <DocumentTitle title="React Base">
        {this.props.activeRouteHandler({ flux: Flux })}
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