var Component = require('omniscient');
var ArticleItem = require('./ArticleItem');
var Comment = require('./Comment');
var View = require('../ui/views/View');
var ImmutableTreeNode = require('../ui/helpers/ImmutableTreeNode');
var TitleBar = require('../TitleBar');
var Drawer = require('../ui/views/Drawer');

require('./Article.styl');

module.exports = Component('Article', (article, statics) => {
  var CommentTree;

  if (!article)
    article = { get: (p) => 'Loading' };
  else
    CommentTree = (article.get('kids') || []).map(comment => (
      <ImmutableTreeNode
        key={comment.get('id')}
        renderComponent={Comment}
        childKey="kids"
        data={comment} /> // all open by default
    )).toArray();

  return (
    <Drawer id="Article" parent={statics.parent}>
      <TitleBar>Comments ()</TitleBar>
      <View>
        {ArticleItem(`ArticleItem-${article.get('id')}`, {article: article})}
        <div id="comments">
          {CommentTree || null}
        </div>
      </View>
    </Drawer>
  );
});