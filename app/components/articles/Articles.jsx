var Component = require('omniscient');
var { RouteHandler, State } = require('react-router');
var Actions = require('actions/Actions');
var List = require('ui/components/List');
var ListItem = require('ui/components/ListItem');
var ViewLeft = require('ui/views/ViewLeft');
var ViewMain = require('ui/views/ViewMain');
var DottedViewList = require('ui/views/DottedViewList');
var ArticleItem = require('./ArticleItem');
var HotArticlesStore = require('stores/HotArticlesStore');

require('./Articles.styl');

var ViewLoaderMixin = {
  // todo have this push "loading...", then have it "undo" once entered
  handleViewEnter(index) {
    this.props.views[index].content = 'Loading...';
  },

  handleViewLeave(i) {
    console.log('VIEW LEAVE', arguments);
  }
};

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

module.exports = Component('Articles', [ViewLoaderMixin, State],
  function render(props) {
    var { cursor, views } = props;
    var subRouteName = this.getRoutes().reverse()[0].name;

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
          {this.getRoutes().length === 3 && (
            <div className="drawer-parent">
              <RouteHandler key={subRouteName} />
            </div>
          )}
        </ViewMain>
      </div>
    );
  }
);