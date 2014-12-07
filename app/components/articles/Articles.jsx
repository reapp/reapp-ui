var Component = require('component');
var Actions = require('actions/Actions');
var List = require('ui/components/List');
var Button = require('ui/components/Button');
var ListItem = require('ui/components/ListItem');
var ViewList = require('ui/views/ViewList');
var View = require('ui/views/View');
var DottedViewList = require('ui/views/DottedViewList');
var ArticleItem = require('./ArticleItem');
var HotArticlesStore = require('stores/HotArticlesStore');

require('./Articles.styl');

module.exports = Component({
  mixins: ['rr.State', 'rr.RouteHandler'],

  getInitialState() {
    return { isRefreshing: false };
  },

  componentWillReceiveProps() {
    this.setState({ isRefreshing: false });
  },

  handleLoadMore(e) {
    e.preventDefault();
    e.target.innerHTML = 'Loading...';
    Actions.articlesHotLoadMore();
  },

  handleRefresh(e) {
    this.setState({ isRefreshing: true });
    Actions.articlesHotRefresh();
  },

  render() {
    var { cursor } = this.props;

    var numRoutes = this.getRoutes().length;
    var hasChild = numRoutes > 2;
    var subRouteKey = this.getRoutes().reverse()[0].name + this.getParams().id;

    var articles = HotArticlesStore()
      .map(id => cursor.get(id.toString()))
      .filter(x => typeof x !== 'undefined');

    var dottedProps =  hasChild ?
      { touchStartBoundsX: { from: 20, to: window.innerWidth - 20 } } :
      null;

    var refreshIconProps = {
      type: 'arrow-refresh',
      size: 24,
      stroke: 1
    };

    if (this.state.isRefreshing)
      refreshIconProps.animation = 'ROTATE';

    var refreshButton = (
      <Button
        iconProps={refreshIconProps}
        onClick={this.handleRefresh}
        borderless />
    );

    return (
      <ViewList initialStep={numRoutes - 2} noFakeTitleBar>
        <View>
          <DottedViewList {...dottedProps}>
            <View
              title={[, 'Hot Articles', refreshButton]}>
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