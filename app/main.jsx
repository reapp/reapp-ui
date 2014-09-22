let React  = require('react');
let Layout = require('./components/layout');

let Agave = require('agave');
Agave.enable('r');

let App = React.createClass({

  render() {
    return (
      <Layout title="hello">
        <this.props.activeRouteHandler />
      </Layout>
    );
  }

});

module.exports = App;