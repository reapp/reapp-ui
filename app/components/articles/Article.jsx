var React = require('react');
var DraggableView = require('../ui/views/DraggableView');
var _ = require('lodash-node');
var debug = require('debug')('g:article');
var { GetStores } = require('../../flux/bootstrap');
var ArticleItem = require('./ArticleItem');
var TitleView = require('../ui/views/TitleView');
var TitleBar = require('../TitleBar');
var TreeNode = require('../ui/helpers/TreeNode');
var Comment = require('./Comment');

require('./Article.styl');

var Article = React.createClass({
  statics: {
    getAsyncProps: (params) => GetStores(params, ['article'])
  },

  render() {
    var Drawer = DraggableView.bind(this, {
      className: "article drawer",
      layer: 2, // todo integrate into app state to manage index
      viewProps: {
        style: { paddingTop: 0 }
      }
    });

    if (!this.props.article)
      return  <Drawer><div /></Drawer>;

    var article = this.props.article[0].data;
    var CommentTree = _.map(article.kids, (comment) => {
      return <TreeNode renderComponent={Comment} childKey="kids" data={comment} />;
    });

    return (
      <Drawer>
        <TitleBar>{article.title}</TitleBar>
        <TitleView>
          <ArticleItem article={article} />
          <div id="comments">
            {CommentTree || null}
          </div>
        </TitleView>
      </Drawer>
    );
  }
});

module.exports = Article;