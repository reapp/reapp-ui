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
    if (!this.props.article) {
      return  <DraggableView className="drawer"><div /></DraggableView>;
    }
    else {
      var article = this.props.article[0].data;
      var articleItem = <ArticleItem article={article} />;
      var comments = article.kids;
      var CommentTree = _.map(comments, (comment) => {
        return <TreeNode renderComponent={Comment} childKey="kids" data={comment} />
      })

      return (
        <DraggableView className="article drawer" viewProps={{style: { zIndex: 10000, paddingTop: 0 } }}>
          <TitleBar>{article.title}</TitleBar>
          <TitleView>
            {articleItem}

            <div id="comments">
              {CommentTree || null}
            </div>
          </TitleView>
        </DraggableView>
      );
    }
  }
});

module.exports = Article;