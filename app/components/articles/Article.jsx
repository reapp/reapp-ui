var Component = require('omniscient');
var DraggableView = require('../../components/ui/views/DraggableView');
var ArticleItem = require('./ArticleItem');
var Comment = require('./Comment');
var TitleView = require('../ui/views/TitleView');
var TreeNode = require('../ui/helpers/TreeNode');
var TitleBar = require('../TitleBar');

module.exports = Component('Article', (cursor) => {
  var article = cursor.get('article');
  var Drawer = DraggableView.bind(this, {
    className: "article drawer",
    layer: 2, // todo integrate into app state to manage index
    viewProps: { style: { paddingTop: 0 } }
  });

  if (!article)
    return <Drawer><div /></Drawer>;

  var CommentTree = article.get('kids').map((comment) => {
    return <TreeNode renderComponent={Comment} childKey="kids" data={comment.toJS()} />;
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
});