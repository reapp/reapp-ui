/** @jsx React.DOM */
var React  = require('react');
var Reactor = require('reactor-core').inject(React);
var Routes = require('./routes');
var Layout = require('./components/layout');

var App = Reactor.createClass({

  routes: Routes,

  updatePageData: function(data) {
    console.log('got new stuff', data);
  },

  render: function(Page, data) {
    return (
      <Layout onClick={this.navigate} title={this.state.title}>
        <Page data={data} className="page" />
      </Layout>
    );
  }

});

Reactor.browserStart(App);

module.exports = App;