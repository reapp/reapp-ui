var React = require('react');
var View = require('../ui/views/View');
var { GetStores } = require('../../flux/bootstrap');
var ArticleItem = require('./ArticleItem');
var TitleView = require('../ui/views/TitleView');
var TitleBar = require('../TitleBar');
var debug = require('debug')('g:article');

var Article = React.createClass({
  statics: {
    getAsyncProps: (params) => GetStores(params, ['article'])
  },

  render() {
    if (!this.props.article) {
      return  <View className="drawer"><div /></View>;
    }
    else {
      var article = this.props.article[0];
      var articleItem = <ArticleItem id={article.id} />;

      return (
        <View className="drawer">
          <TitleBar>{article.title}</TitleBar>
          <TitleView>
            {articleItem}
          </TitleView>
        </View>
      );
    }
  }
});

module.exports = Article;