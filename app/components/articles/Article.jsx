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

var getComments = comments => comments &&
  comments.map(comment => (
    <ImmutableTreeNode
      idKey="id"
      childKey="kids"
      renderComponent={Comment}
      data={comment} />
  )).toArray();

module.exports = Component('Article', [Navigation],
  function render(props) {
    var { cursor } = props;
    var article = cursor && cursor.get('data') || { get: () => 'Loading' };
    var commentTree = article.get('kidsLoaded') ? getComments(article.get('kids')) : null;
    var parents = ['articlesLeftView', 'hamburger'];

    return (
      <Drawer id="Article" parents={parents}>
        <TitleBar left={<BackButton />}>Comments ()</TitleBar>
        <View>
          {ArticleItem(`ArticlePage-ArticleItem-${article.get('id')}`, cursor)}
          <div id="comments">
            {commentTree}
          </div>
        </View>
      </Drawer>
    );
  }
);