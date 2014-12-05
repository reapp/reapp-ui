var React = require('react');
var { State, RouteHandlerMixin } = require('react-router');
var Actions = require('actions/Actions');
var List = require('ui/components/List');
var ListItem = require('ui/components/ListItem');
var ViewList = require('ui/views/ViewList');
var View = require('ui/views/View');
var DottedViewList = require('ui/views/DottedViewList');
var ArticleItem = require('./ArticleItem');
var HotArticlesStore = require('stores/HotArticlesStore');

require('./Articles.styl');

// todo: put stores in context,
// declaratively say stores rather than pass as cursor?

module.exports = React.createClass({
  mixins: [State, RouteHandlerMixin],

  handleLoadMore(e) {
    e.preventDefault();
    e.target.innerHTML = 'Loading...';
    Actions.loadMoreHotArticles();
  },

  render() {
    var { cursor } = this.props;

    var numRoutes = this.getRoutes().length;
    var hasChild = numRoutes > 2;
    var subRouteKey = this.getRoutes().reverse()[0].name + this.getParams().id;

    var articles = HotArticlesStore()
      .map(id => cursor.get(id.toString()))
      .filter(x => typeof x !== 'undefined');

    return (
      <ViewList initialStep={numRoutes - 2} noFakeTitleBar>
        <View>
          <DottedViewList>
            <View title="Hot Articles">
              <List dontWrapChildren styles={{ self: { borderTop: 'none' } }}>
                {articles.count() ?
                  articles.map((article, i) =>
                    <ArticleItem cursor={article} key={i} />
                  ).toArray()
                  .concat(
                    <ListItem
                      style={{textAlign:'center'}}
                      onClick={this.handleLoadMore}>
                      Load More
                    </ListItem>
                  ) :
                  <ListItem style={{textAlign: 'center'}}>Loading...</ListItem>
                }
                </List>
            </View>

            <View title="Top Articles" />
          </DottedViewList>
        </View>

        {hasChild && this.getRouteHandler({ key: subRouteKey })}
      </ViewList>
    );
  }
});