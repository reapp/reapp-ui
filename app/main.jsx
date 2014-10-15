var React  = require('react');
var Layout = require('./components/Layout');
var Routes = require('./routes');
var TouchEvents = require('./components/ui/lib/TouchEvents');
var ReactStyle = require('react-style');
var { Flux } = require('./flux/bootstrap');
var GSSMixin = require('./mixins/GSSMixin');
var ENV = require('./ENV');

ReactStyle.inject();
TouchEvents.initialize();

// App
var App = React.createClass({
  componentDidMount() {
    GSSMixin._start();
  },

  render() {
    var ActiveRoute = this.props.activeRouteHandler;

    return (
      <Layout>
        <ActiveRoute flux={Flux} />
      </Layout>
    );
  }
});

var RoutedApp = Routes.init(App);

if (ENV.CLIENT) {
  window.React = React;

  React.renderComponent(RoutedApp, document.getElementById('app'), function() {
    // clear out data handed by server, or getRouteProps will
    // find it even though getRouteProps may have different params
    window.ROUTER_PROPS = void 0;
  });
}
else {
  module.exports = RoutedApp;
}