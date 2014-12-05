var React = require('react');
var ArticleItem = require('./ArticleItem');
var Comment = require('./Comment');
var ImmutableTreeNode = require('ui/helpers/ImmutableTreeNode');
var View = require('ui/views/View');
var BackButton = require('ui/components/buttons/BackButton');

require('./Article.styl');

module.exports = React.createClass({
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
    var { cursor, ...props } = this.props;
    var data = cursor && cursor.get('data');
    var article = data || { get: () => 'Loading' };
    var hasComments = data && article.get('kidsLoaded');

    return (
      <View {...props}
        title={[<BackButton />, 'Comments ()']}
        titleBarProps={{ height: 48 }}>
        <ArticleItem cursor={cursor} />
        {hasComments && (
          <div id="comments">
            {this.getComments(article.get('kids'))}
          </div>
        )}
      </View>
    );
  }
});