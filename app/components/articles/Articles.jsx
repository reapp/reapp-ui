var { Component } = require('carpo');
var { ActiveRouteHandler } = require('react-router');
var List = require('ui/components/List');
var ViewLeft = require('ui/views/ViewLeft');
var ViewMain = require('ui/views/ViewMain');
var DottedViewList = require('ui/views/DottedViewList');
var ArticleItem = require('./ArticleItem');
var ViewLoaderMixin = require('ViewLoaderMixin');

require('./Articles.styl');

module.exports = Component('Articles', [ViewLoaderMixin],
  function render(props) {
    var { cursor } = props;

    var articles = cursor.get('data');
    if (!articles) return <div />;

    makeViews(cursor);
    debugger;

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
        </ViewMain>
      </div>
    );
  }
);

// {ActiveRouteHandler && (
//   <div className="drawer-parent">
//     <ActiveRouteHandler {...this.props} />
//   </div>
// )}

var hasSetContents;

function makeViews(cursor) {
  if (hasSetContents) return;

  cursor.get('views').forEach(view => {
    view.update('content', content => contentForViews(cursor.get('data')));
  });

  hasSetContents = true;
}

function contentForViews(articles) {
  return (
    <List liStyle={{ padding: 0 }}>
      {articles.map(article =>
        ArticleItem(`AI-${article.get('id')}`, article)).toArray()}
    </List>
  );
}