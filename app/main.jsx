var React  = require('react');
var Layout = require('./components/Layout');
var Routes = require('./routes');
var TouchEvents = require('ui/lib/TouchEvents');
var ReactStyle = require('react-style');
var Brawndo = require('brawndo');
var GSSMixin = require('./mixins/GSSMixin');
var ENV = require('./ENV');

// Flux
var Actions = require('./Actions/Actions');
var Stores = require('./Stores/Stores');
var Flux = Brawndo.init({ React, Actions, Stores });

ReactStyle.inject();
TouchEvents.initialize();

// App
var App = React.createClass({
  componentDidMount() {
    GSSMixin._start();
  },

  render() {
    return (
      <Layout>
        <this.props.activeRouteHandler flux={Flux} />
      </Layout>
    );
  }
});

var RoutedApp = Routes.init(App);

if (ENV.CLIENT) {
  window.React = React;

  // debug omniscient
  // require('omniscient').debug();

  React.renderComponent(RoutedApp, document.getElementById('app'), function() {
    // clear out data handed by server, or getRouteProps will
    // find it even though getRouteProps may have different params
    window.ROUTER_PROPS = void 0;
  });
}
else {
  module.exports = RoutedApp;
}