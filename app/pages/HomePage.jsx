var React = require('react');
var { Link } = require('react-router');
var _ = require('lodash-node');
var Time = require('react-ago-component');
var { Flux, FluxMixin } = require('../flux');
var GSSMixin = require('../mixins/GSSMixin');
var View = require('../components/ui/views/View');
var TitleBar = require('../components/TitleBar');
var List = require('../components/ui/components/List');

require('./HomePage.styl');

module.exports = React.createClass({
  mixins: [FluxMixin, GSSMixin],

  title: 'Home',

  layout: `
    .time[right] == .article[right];
  `,

  statics: {
    didTransitionTo(params, query, setProps) {
      var store = Flux.store('articleStore');

      Flux.actions.loadArticles();
      store.on('change', function() {
        setProps({
          data: _.values(store.articles)
        });
      })
    },

    shouldRenderWithProps(props) {
      return !!props.data;
    }
  },

  articlesList() {
    return _.map(this.props.data, (item) => {
      var article = item.data;
      return (
        <div className="article">
          <h3>
            <a href={article.url}>
              {article.title}
            </a>
          </h3>
          <ul>
            <li className="score">{article.score}</li>
            <li>{article.by}</li>
            <li className="time"><Time date={new Date(article.time * 1000)} autoUpdate /></li>
          </ul>
        </div>
      );
    });
  },

  render() {
    return (
      <View id="HomePage">
        <TitleBar>{this.title}</TitleBar>
        <List>
          {this.articlesList()}
        </List>
      </View>
    );
  }

});