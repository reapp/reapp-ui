var React  = require('react');
var Layout = require('./components/Layout');
var Routes = require('./routes');
var TouchEvents = require('./components/ui/lib/TouchEvents');
var ReactStyle = require('react-style');
var { Flux } = require('./flux');
var GSSMixin = require('./mixins/GSSMixin');

require('./ENV');

if (ENV.CLIENT)
  window.React = React;

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

module.exports = Routes.init(App);