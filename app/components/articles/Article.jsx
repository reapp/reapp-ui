var { Component } = require('carpo');
var { Navigation } = require('react-router');
var ArticleItem = require('./ArticleItem');
var Comment = require('./Comment');
var View = require('ui/views/View');
var ImmutableTreeNode = require('ui/helpers/ImmutableTreeNode');
var TitleBar = require('ui/components/TitleBar');
var Drawer = require('ui/views/Drawer');
var Button = require('ui/components/Button');

require('./Article.styl');

module.exports = Component('Article', [Navigation],
  function render(cursor) {
    var article = cursor.get('article');
    article = article || { get: () => 'Loading' };

    var BackButton = (
      <Button onClick={this.goBack} type="angle-left">
        Back
      </Button>
    );

    var CommentTree = (article.get('kids') || [])
      .map(comment => (
        <ImmutableTreeNode
          key={Math.random()}
          idKey="id"
          childKey="kids"
          renderComponent={Comment}
          data={comment} />
      )).toArray();

    var parents = ['articlesLeftView', 'hamburger'];

    return (
      <Drawer id="Article" parents={parents}>
        <TitleBar left={BackButton}>Comments ()</TitleBar>
        <View>
          {ArticleItem(`ArticlePage-ArticleItem-${article.get('id')}`, article)}
          <div id="comments">
            {CommentTree || null}
          </div>
        </View>
      </Drawer>
    );
  }
);