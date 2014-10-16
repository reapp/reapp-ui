var React = require('react');
var View = require('../ui/views/View');
var { GetStores } = require('../../flux/bootstrap');
var ArticleItem = require('./ArticleItem');

var Article = React.createClass({
  statics: {
    getAsyncProps: (params) => GetStores(params, ['article'])
  },

  shouldComponentUpdate(nextProps) {
    return this.props.article !== nextProps.article;
  },

  render() {
    var article = this.props.article ?
      <ArticleItem article={this.props.article[0].data} /> :
      <div />;

    return (
      <View className="drawer">
        {article}
      </View>
    );
  }
});

module.exports = Article;