var { Component } = require('carpo');
var List = require('ui/components/List');
var ViewLeft = require('ui/views/ViewLeft');
var ViewMain = require('ui/views/ViewMain');
var DottedViewList = require('ui/views/DottedViewList');
var ArticleItem = require('./ArticleItem');
var ViewLoaderMixin = require('ViewLoaderMixin');

require('./Articles.styl');

module.exports = Component('Articles', [ViewLoaderMixin],
  function render(cursor) {
    var articles = cursor.get('articles');
    if (!articles) return <div />;

    var content = cursor.get('handler')();
    var views = makeViews(cursor);

    return (
      <div id="ArticlesPage">
        <ViewLeft id="articlesLeftView">
          <DottedViewList
            views={views}
            onViewLeave={this.handleViewLeave}
            onViewEnter={this.handleViewEnter}
            onTouchStart={this.handleTouchStart} />
        </ViewLeft>

        <ViewMain>
          {content && <div className="drawer-parent">{content}</div>}
        </ViewMain>
      </div>
    );
  }
);

var views = [
  { id: 'hot', title: 'Hot', content: null },
  { id: 'top', title: 'Top', content: null }
];

function makeViews(cursor) {
  if (this.hasSetContents) return views;
  this.hasSetContents = true;

  views.forEach(view => {
    view.content = contentForViews(cursor.get('articles'));
  });

  return views;
}

function contentForViews(articles) {
  return (
    <List liStyle={{ padding: 0 }}>
      {articles.map(article => {
        return ArticleItem(`Articles-ArticleItem-${article.get('id')}`, article.get('data'));
      }).toArray()}
    </List>
  );
}