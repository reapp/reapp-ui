var Component = require('omniscient');
var ArticleItem = require('./ArticleItem');
var Comment = require('./Comment');
var TitleView = require('../ui/views/TitleView');
var ImmutableTreeNode = require('../ui/helpers/ImmutableTreeNode');
var TitleBar = require('../TitleBar');

require('./Article.styl');

module.exports = Component('Article', cursor => {
  var article = cursor.get('article');
  if (!article) return <div />;

  var CommentTree = article.get('kids').map(comment => (
    <ImmutableTreeNode
      key={comment.get('id')}
      renderComponent={Comment}
      childKey="kids"
      data={comment} />
  )).toArray();

  return (
    <div>
      <TitleBar>{article.get('title')}</TitleBar>
      <TitleView>
        {ArticleItem(`Article-${article.get('id')}`, {article: article})}
        <div id="comments">
          {CommentTree || null}
        </div>
      </TitleView>
    </div>
  );
});