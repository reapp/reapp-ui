var ArticleItem = require('./ArticleItem');
var Comment = require('./Comment');
var ImmutableTreeNode = require('ui/helpers/ImmutableTreeNode');
var View = require('ui/views/View');
var BackButton = require('ui/components/buttons/BackButton');
var { actions, mixins } = Component;
var { ArticlesStore } = Component.stores;

require('./Article.styl');

module.exports = Component({
  mixins: ['RouteState'],

  statics: {
    fetchData(params) {
      actions.articleLoad(params.id);
      return new Promise((res, rej) => {
        actions.articleLoadDone(id => id === params.id &&
          res(ArticlesStore().get(params.id)));
      });
    }
  },

  getComments(comments) {
    return comments && comments.map(comment => (
      <ImmutableTreeNode
        idKey="id"
        cursor={comment}
        childKey="kids"
        renderComponent={Comment} />
    )).toArray();
  },

  render() {
    var cursor = ArticlesStore().get(Number(this.getParams().id));
    var article = cursor && cursor.get('data');
    var commentsLoaded = article && article.get('kidsLoaded');
    var articleItemStyles = {
      self: { borderTop: 'none' },
      after: { display: 'none' }
    };

    return (
      <View {...this.props}
        title={[<BackButton />, 'Comments ()']}
        titleBarProps={{ height: 48 }}>
        {article && (
          <ArticleItem cursor={cursor} styles={articleItemStyles} />
        )}
        {commentsLoaded && (
          <div id="comments">
            {this.getComments(article.get('kids'))}
          </div>
        )}
      </View>
    );
  }
});