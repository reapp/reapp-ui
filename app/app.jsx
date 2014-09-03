/** @jsx React.DOM */
var React  = require('react');
var Reactor = require('reactor-core').inject(React);
var Routes = require('./routes');
var Layout = require('./components/layout');
var Agave = require('agave');

Agave.enable('r');

var App = Reactor.createClass({

  routes: Routes,

  updatePageData: function(data) {
    console.log('got new stuff', data);
  },

  render: function(Page, state) {
    var head = this.state.head;
    var title = head ? head.title || '' : '';

    return (
      <Layout onClick={this.navigate} title={title}>
        <Page data={state.data} className="page" />
      </Layout>
    );
  }

});

Reactor.browserStart(App, function() {



});

module.exports = App;