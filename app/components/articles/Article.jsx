var Component = require('omniscient');
var ArticleItem = require('./ArticleItem');
var Comment = require('./Comment');
var TitleView = require('../ui/views/TitleView');
var ImmutableTreeNode = require('../ui/helpers/ImmutableTreeNode');
var TitleBar = require('../TitleBar');
var Drawer = require('../ui/views/Drawer');

require('./Article.styl');

module.exports = Component('Article', cursor => {
  var article = cursor.get('article');
  var CommentTree;

  if (!article)
    article = { get: (p) => 'Loading' };
  else
    CommentTree = (article.get('kids') || []).map(comment => (
      <ImmutableTreeNode
        key={comment.get('id')}
        renderComponent={Comment}
        childKey="kids"
        data={comment} />
    )).toArray();

  return (
    <Drawer id="Article">
      <TitleBar>Comments ()</TitleBar>
      <TitleView>
        {ArticleItem(`ArticleItem-${article.get('id')}`, {article: article})}
        <div id="comments">
          {CommentTree || null}
        </div>
      </TitleView>
    </Drawer>
  );
});