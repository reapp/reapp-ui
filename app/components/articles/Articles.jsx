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

require('./Articles.styl');

function handleLoadMore(e) {
  e.preventDefault();
  Actions.loadMoreHotArticles();
}

module.exports = Component('Articles', [ViewLoaderMixin],
  function render(props) {
    var { cursor } = props;
    var Handler = RouteHandler(this.props);

    var views = [
      { id: 'hot', title: 'Hot', content: null },
      { id: 'top', title: 'Top', content: null }
    ];

    Object.keys(views).forEach(key => {
      views[key].content = (
        <List dontWrap={true} liStyle={{ padding: 0 }}>
          {cursor && cursor.map(article => ArticleItem(`AI-${article.get('id')}`, article))
            .toArray().concat([
              <ListItem style={{ textAlign:'center' }} onClick={handleLoadMore}>Load More</ListItem>
          ])}
        </List>
      );
    });

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