var Component = require('omniscient');
var { RouteHandler, State } = require('react-router');
var Actions = require('actions/Actions');
var List = require('ui/components/List');
var ListItem = require('ui/components/ListItem');
var ViewList = require('ui/views/ViewList');
var View = require('ui/views/View');
var DottedViewList = require('ui/views/DottedViewList');
var ArticleItem = require('./ArticleItem');
var HotArticlesStore = require('stores/HotArticlesStore');

require('./Articles.styl');

module.exports = Component('Articles', [State],
  function render(props) {
    var { cursor, views, ...rest } = props;

    var handleLoadMore = (e) => {
      e.preventDefault();
      e.target.innerHTML = 'Loading...';
      Actions.loadMoreHotArticles();
    };

    var numRoutes = this.getRoutes().length;
    var hasChild = numRoutes > 2;
    var subRouteKey = this.getRoutes().reverse()[0].name + this.getParams().id;

    var articles = HotArticlesStore()
      .map(id => cursor.get(id.toString()))
      .filter(x => typeof x !== 'undefined');

    var hasArticles = articles.count();

    return (
      <ViewList initialStep={numRoutes - 2} noTitleBar>
        <View>
          <DottedViewList>
            <View title="Hot Articles">
              <List dontWrapChildren styles={{ self: { borderTop: 'none' } }}>
                {hasArticles ?
                  articles
                    .map(article => ArticleItem(`AI-${article.get('id')}`, article))
                    .toArray()
                    .concat(
                      <ListItem style={{textAlign:'center'}} onClick={handleLoadMore}>Load More</ListItem>
                    ) :
                  <ListItem style={{textAlign: 'center'}}>Loading...</ListItem>
                }
                </List>
            </View>

            <View title="Top Articles" />
          </DottedViewList>
        </View>

        {hasChild && <RouteHandler {...rest} key={subRouteKey} />}
      </ViewList>
    );
  }
);