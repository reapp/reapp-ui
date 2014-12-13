var React = require('react');
var Component = require('component');
var ParallaxViewList = require('ui/views/ParallaxViewList');
var View = require('ui/views/View');
var ArticlesHome = require('./articles/ArticlesHome');

var { actions, helpers, mixins } = Component;
var { ArticlesStore, HotArticlesStore } = Component.stores;

require('./Articles.styl');

module.exports = Component({
  statics: {
    fetchData: params => (
      actions.articlesHotLoad() &&
      helpers.storePromise(ArticlesStore, data => !!data.size)
    )
  },

  mixins: [
    // getViewListProps, getKeyedSubRoute
    mixins.routedViewListHandler({ depth: 2 }),
    mixins.listener(
      ArticlesStore,
      actions.articlesHotLoadDone
    )
  ],

  render() {
    var { handle } = this.props;
    var articles = HotArticlesStore()
      .map(id => ArticlesStore().get(id))
      .filter(x => typeof x !== 'undefined');

    return (
      <ParallaxViewList
        {...this.getViewListProps()}
        noFakeTitleBar>
        <View>
          <ArticlesHome
            disable={this.numRoutes() > 2}
            hasChild={this.hasChildRoute()}
            articles={articles}
            handle={handle} />
        </View>

        {this.getKeyedSubRoute()}
      </ParallaxViewList>
    );
  }
});