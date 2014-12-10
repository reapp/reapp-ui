var React = require('react');
var Component = require('component');
var List = require('ui/components/List');
var Button = require('ui/components/Button');
var ListItem = require('ui/components/ListItem');
var ViewList = require('ui/views/ViewList');
var View = require('ui/views/View');
var DottedViewList = require('ui/views/DottedViewList');
var ArticleItem = require('./articles/ArticleItem');
var { actions, helpers, mixins } = Component;
var { ArticlesStore, HotArticlesStore } = Component.stores;

require('./Articles.styl');

module.exports = Component({
  mixins: [
    'RouteState',
    'RouteHandler',
    mixins.storeListener(ArticlesStore)
  ],

  statics: {
    fetchData() {
      actions.articlesHotLoad();
      return helpers.storePromise(ArticlesStore, data => !!data.size);
    }
  },

  getInitialState() {
    return { isRefreshing: false };
  },

  componentWillReceiveProps() {
    // this.setState({ isRefreshing: false });
  },

  handleLoadMore(e) {
    e.preventDefault();
    e.target.innerHTML = 'Loading...';
    actions.articlesHotLoadMore();
  },

  handleRefresh(e) {
    this.setState({ isRefreshing: true });
    // actions.articlesHotRefresh();
  },

  render() {
    var { menuButton } = this.props;

    var numRoutes = this.getRoutes().length;
    var hasChild = numRoutes > 2;
    var subRouteKey = this.getRoutes().reverse()[0].name + this.getParams().id;

    var articles = HotArticlesStore()
      .map(id => ArticlesStore().get(id.toString()))
      .filter(x => typeof x !== 'undefined');

    var dottedProps =  hasChild ?
      { touchStartBoundsX: { from: 20, to: window.innerWidth - 20 } } :
      null;

    var refreshIconProps = {
      type: 'arrow-refresh',
      size: 24,
      stroke: 1,
      styles: { self: { marginTop: -1 } },
      animations: this.state.isRefreshing ? [{ name: 'rotate' }] : null
    };

    var refreshButton = (
      <Button
        iconProps={refreshIconProps}
        onClick={this.handleRefresh}
        borderless />
    );

    return (
      <ViewList scrollToStep={numRoutes - 2} noFakeTitleBar>
        <View>
          <DottedViewList {...dottedProps}>
            <View title={[menuButton, 'Hot Articles', refreshButton]}>
              <List dontWrapChildren styles={{ self: { borderTop: 'none' } }}>
                {articles.count() ?
                  articles.map((article, i) =>
                    <ArticleItem cursor={article} key={i} />
                  ).toArray()
                  .concat(
                    <ListItem
                      key={-1}
                      style={{textAlign:'center'}}
                      onClick={this.handleLoadMore}>
                      Load More
                    </ListItem>
                  ) :
                  <ListItem key={-1} style={{textAlign: 'center'}}>Loading...</ListItem>
                }
                </List>
            </View>

            <View title={[menuButton, 'Saved Articles']} />
          </DottedViewList>
        </View>

        {hasChild && this.getRouteHandler({ key: subRouteKey })}
      </ViewList>
    );
  }
});