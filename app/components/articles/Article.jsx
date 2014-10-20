var Component = require('omniscient');
var DraggableView = require('../../components/ui/views/DraggableView');
var ArticleItem = require('./ArticleItem');
var Comment = require('./Comment');
var TitleView = require('../ui/views/TitleView');
var ImmutableTreeNode = require('../ui/helpers/ImmutableTreeNode');
var TitleBar = require('../TitleBar');

require('./Article.styl');

module.exports = Component('Article', cursor => {
  var article = cursor.get('article');
  var Drawer = DraggableView.bind(this, {
    className: 'article drawer',
    layer: 2, // todo integrate into app state to manage index
    viewProps: { style: { paddingTop: 0 } }
  });

  if (!article) return <Drawer />;

  var CommentTree = article.get('kids').map(comment => (
    <ImmutableTreeNode
      renderComponent={Comment}
      childKey="kids"
      data={comment}
      dataKey="data" />
  )).toArray();

  return (
    <Drawer>
      <TitleBar>{article.get('title')}</TitleBar>
      <TitleView>
        <ArticleItem article={article.toJS()} />
        <div id="comments">
          {CommentTree || null}
        </div>
      </TitleView>
    </Drawer>
  );
});