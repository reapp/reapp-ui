var Component = require('omniscient');
var { Navigation } = require('react-router');
var ArticleItem = require('./ArticleItem');
var Comment = require('./Comment');
var View = require('ui/views/View');
var ImmutableTreeNode = require('ui/helpers/ImmutableTreeNode');
var TitleBar = require('ui/components/TitleBar');
var Drawer = require('ui/views/Drawer');
var BackButton = require('ui/components/buttons/BackButton');

require('./Article.styl');

module.exports = Component('Article', [Navigation],
  function render(props) {
    var { cursor } = props;
    var article = cursor && cursor.get('data') || { get: () => 'Loading' };

    var comments = article.get('kids');
    var CommentTree = comments && comments.map(comment => {
      return (
        <ImmutableTreeNode
          key={Math.random()}
          idKey="id"
          childKey="kids"
          renderComponent={Comment}
          data={comment} />
      );
    }).toArray();

    var parents = ['articlesLeftView', 'hamburger'];

    return (
      <Drawer id="Article" parents={parents}>
        <TitleBar left={<BackButton />}>Comments ()</TitleBar>
        <View>
          {ArticleItem(`ArticlePage-ArticleItem-${article.get('id')}`, cursor)}
          <div id="comments">
            {CommentTree || null}
          </div>
        </View>
      </Drawer>
    );
  }
);