var React = require('react');
var View = require('../ui/views/View');
var { GetStores } = require('../../flux/bootstrap');
var ArticleItem = require('./ArticleItem');
var debug = require('debug')('g:article');

var Article = React.createClass({
  statics: {
    getAsyncProps: (params) => GetStores(params, ['article'])
  },

  shouldComponentUpdate(nextProps) {
    var shouldUpdate = nextProps.article !== null && this.props.article !== nextProps.article;
    debug('shouldComponentUpdate %s', shouldUpdate);
    return shouldUpdate;
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