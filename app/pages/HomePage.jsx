var React = require('react');
var _ = require('lodash-node');
var Time = require('react-ago-component');
var { FluxMixin, GetStores } = require('../flux');
var GSSMixin = require('../mixins/GSSMixin');
var View = require('../components/ui/views/View');
var TitleBar = require('../components/TitleBar');
var List = require('../components/ui/components/List');

require('./HomePage.styl');

module.exports = React.createClass({
  title: 'Home',

  mixins: [FluxMixin, GSSMixin],

  statics: {
    getRouteProps: () => GetStores('article')
  },

  layout: `
    .time[right] == .article[right];
  `,

  articlesList() {
    return _.map(this.props.article, (item) => {
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
    console.log(this.props)
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