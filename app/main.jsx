var React  = require('react');
var Layout = require('./components/Layout');
var Routes = require('./routes');
var TouchEvents = require('./components/ui/lib/TouchEvents');
var ReactStyle = require('react-style');
var { Flux } = require('./flux');
var GSSMixin = require('./mixins/GSSMixin');

window.React = React;
ReactStyle.inject();
TouchEvents.initialize();

// App
var App = React.createClass({
  getInitialState() {
    return {
      container: null
    }
  },

  componentDidMount() {
    GSSMixin._start();
  },

  onUpdateContainer(el) {
    this.setState({ container: el });
  },

  render() {
    var ActiveRoute = this.props.activeRouteHandler;

    return (
      <Layout>
        <ActiveRoute flux={Flux} container={this.state.container} />
      </Layout>
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