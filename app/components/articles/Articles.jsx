var Component = require('omniscient');
var { RouteHandler } = require('react-router');
var List = require('ui/components/List');
var ViewLeft = require('ui/views/ViewLeft');
var ViewMain = require('ui/views/ViewMain');
var DottedViewList = require('ui/views/DottedViewList');
var ArticleItem = require('./ArticleItem');
var ViewLoaderMixin = require('mixins/ViewLoaderMixin');

require('./Articles.styl');

module.exports = Component('Articles', [ViewLoaderMixin],
  function render(props) {
    var { data, views } = props;
    if (!data) return <span />;

    var Handler = RouteHandler(this.props);
    makeViews(views, data.get('articles'));

    return (
      <div id="ArticlesPage">
        <ViewLeft id="articlesLeftView">
          <DottedViewList
            views={views && views.toJS()}
            onViewLeave={this.handleViewLeave}
            onViewEnter={this.handleViewEnter}
            onTouchStart={this.handleTouchStart} />
        </ViewLeft>

        <ViewMain>
          {Handler && (
            <div className="drawer-parent">
              {Handler}
            </div>
          )}
        </ViewMain>
      </div>
    );
  }
);

var hasSetContents;

function makeViews(views, data) {
  if (hasSetContents || !views || !data) return;

  views.forEach(view => {
    view.update('content', content => contentForViews(data));
  });

  hasSetContents = true;
}

function contentForViews(articles) {
  return (
    <List dontWrap={true} liStyle={{ padding: 0 }}>
      {articles && articles.map(article =>
        ArticleItem(`AI-${article.get('id')}`, article)).toArray()}
    </List>
  );
}