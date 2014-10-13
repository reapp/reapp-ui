var React = require('react');
var { Link } = require('react-router');
var { Flux, FluxMixin } = require('../flux');
var View = require('../components/ui/views/View');
var TitleBar = require('../components/TitleBar');

module.exports = React.createClass({
  mixins: [FluxMixin],

  title: 'Home',

  statics: {
    didTransitionTo(params, query, setProps) {
      var store = Flux.store('articleStore');

      Flux.actions.loadArticles();
      store.on('change', function() {
        setProps({ articles: store.articles });
      })
    },

    shouldRenderWithProps(props) {
      return !!props.articles;
    }
  },

  render() {
    return (
      <View id="HomePage">
        <TitleBar>{this.title}</TitleBar>
        {this.props.articles}
      </View>
    );
  }

});