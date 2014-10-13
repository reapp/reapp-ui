var React = require('react');
var { Link } = require('react-router');
var _ = require('lodash');
var { Flux, FluxMixin } = require('../flux');
var View = require('../components/ui/views/View');
var TitleBar = require('../components/TitleBar');
var List = require('../components/ui/components/List');

module.exports = React.createClass({
  mixins: [FluxMixin],

  title: 'Home',

  statics: {
    didTransitionTo(params, query, setProps) {
      var store = Flux.store('articleStore');

      Flux.actions.loadArticles();
      store.on('change', function() {
        console.log('change', store.articles)
        setProps({
          articles: _.values(store.articles)
        });
      })
    },

    shouldRenderWithProps(props) {
      return !!props.articles;
    }
  },

  articlesList() {
    return _.map(this.props.articles, (item) => {
      var article = item.article;
      return (
        <div className="article">
          <h3>
            <a href={article.url}>
              {article.title}
            </a>
          </h3>
          <ul>
            <li>{article.score}</li>
            <li>{article.by}</li>
            <li>{article.time}</li>
          </ul>
        </div>
      );
    });
  },

  render() {
    console.log(this.props.articles)
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