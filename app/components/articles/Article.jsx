var Component = require('omniscient');
var { Navigation } = require('react-router');
var ArticleItem = require('./ArticleItem');
var Comment = require('./Comment');
var ImmutableTreeNode = require('ui/helpers/ImmutableTreeNode');
var View = require('ui/views/View');
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
    var { cursor, ...rest } = props;
    var article = cursor && cursor.get('data') || { get: () => 'Loading' };
    var commentTree = article.get('kidsLoaded') ? getComments(article.get('kids')) : null;
    var parents = ['articlesLeftView', 'hamburger'];

    return (
      <View {...rest} id="Article" title={[<BackButton />, 'Comments ()']}>
        {ArticleItem(`ArticlePage-ArticleItem-${article.get('id')}`, cursor)}
        <div id="comments">
          {commentTree}
        </div>
      </View>
    );
  }
);