var Component = require('omniscient');
var ArticleItem = require('./ArticleItem');
var Comment = require('./Comment');
var View = require('../ui/views/View');
var ImmutableTreeNode = require('../ui/helpers/ImmutableTreeNode');
var TitleBar = require('../TitleBar');
var Drawer = require('../ui/views/Drawer');

require('./Article.styl');

var Article = Component('Article', article => {
  var CommentTree;

  if (!article)
    article = { get: () => 'Loading' };
  else
    CommentTree = (article.get('kids') || []).map(comment => (
      <ImmutableTreeNode
        idKey="id"
        renderComponent={Comment}
        childKey="kids"
        data={comment} /> // all open by default
    )).toArray();

  var parents = [
    document.getElementById('articlesLeftView'),
    document.getElementById('hamburger')
  ];

  return (
    <Drawer id="Article" parents={parents}>
      <TitleBar>Comments ()</TitleBar>
      <View>
        {ArticleItem(`ArticlePage-ArticleItem-${article.get('id')}`, article)}
        <div id="comments">
          {CommentTree || null}
        </div>
      </View>
    </Drawer>
  );
});

module.exports = Article;