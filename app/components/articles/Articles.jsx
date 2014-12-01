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
  e.target.innerHTML = 'Loading...';
  Actions.loadMoreHotArticles();
}

function setViewContents(view, hotArticlesList, articlesStore) {
  var articles = hotArticlesList
    .map(id => articlesStore.get(id.toString()))
    .filter(x => typeof x !== 'undefined');

  view.content = !articles.count() ? (
    <List>
      <ListItem style={{textAlign: 'center'}}>Loading...</ListItem>
    </List>
  ) : (
    <List dontWrap={true}>
      {articles
        .map(article => ArticleItem(`AI-${view.id}-${article.get('id')}`, article))
        .toArray()
        .concat([
          <ListItem style={{textAlign:'center'}} onClick={handleLoadMore}>Load More</ListItem>
        ])
      }
    </List>
  );
}

module.exports = Component('Articles', [ViewLoaderMixin, State],
  function render(props) {
    var { cursor, views } = props;
    var subRouteKey = this.getRoutes().reverse()[0].name + this.getParams().id;

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
          <RouteHandler key={subRouteKey} />
        </ViewMain>
      </div>
    );
  }
);