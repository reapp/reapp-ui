var Component = require('omniscient');
var { RouteHandler } = require('react-router');
var Actions = require('actions/Actions');
var List = require('ui/components/List');
var ListItem = require('ui/components/ListItem');
var ViewLeft = require('ui/views/ViewLeft');
var ViewMain = require('ui/views/ViewMain');
var DottedViewList = require('ui/views/DottedViewList');
var ArticleItem = require('./ArticleItem');
var ViewLoaderMixin = require('mixins/ViewLoaderMixin');
var HotArticlesStore = require('stores/HotArticlesStore');

require('./Articles.styl');

function handleLoadMore(e) {
  e.preventDefault();
  Actions.loadMoreHotArticles();
}

function setViewContents(view, list, articles) {
  view.content = (
    <List dontWrap={true} liStyle={{ padding: 0 }}>
      {list
        .map(id => ArticleItem(`AI-${view.id}-${id}`, articles.get(id.toString())))
        .toArray()
        .concat([
          <ListItem style={{ textAlign:'center' }} onClick={handleLoadMore}>Load More</ListItem>
        ])
      }
    </List>
  );
}

module.exports = Component('Articles', [ViewLoaderMixin],
  function render(props) {
    var { cursor } = props;
    var Handler = RouteHandler(this.props);

    var views = [
      { id: 'hot', title: 'Hot', content: null },
      { id: 'top', title: 'Top', content: null }
    ];

    setViewContents(views[0], HotArticlesStore(), cursor);

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