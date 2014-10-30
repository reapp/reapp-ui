var Component = require('carpo');
var List = require('ui/components/List');
var ViewLeft = require('ui/views/ViewLeft');
var ViewMain = require('ui/views/ViewMain');
var DottedViewList = require('ui/views/DottedViewList');
var ArticleItem = require('./ArticleItem');
var ViewLoaderMixin = require('ViewLoaderMixin');

require('./Articles.styl');

module.exports = Component('Articles',
  [ViewLoaderMixin],

  function render(cursor) {
    var articles = cursor.get('articles');
    if (!articles) return <div />;
    var content = cursor.get('handler')();

    setViewContents(cursor);

    return (
      <div id="ArticlesPage">
        <ViewLeft id="articlesLeftView">
          <DottedViewList
            views={cursor.get('views').toArray().map(v => v.toJS())}
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

function setViewContents(cursor) {
  if (this.hasSetContents) return;
  cursor.get('views').forEach(view => {
    view.update('content', content => contentForViews(cursor.get('articles')));
  });
  this.hasSetContents = true;
}

function contentForViews(articles) {
  return (
    <List>
      {articles.map(article => (
        ArticleItem(`Articles-ArticleItem-${article.get('id')}`, article.get('data'))
      )).toArray()}
    </List>
  );
}