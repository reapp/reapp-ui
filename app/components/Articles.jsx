var React = require('react');
var Component = require('component');
var NestedViewList = require('ui/views/NestedViewList');
var View = require('ui/views/View');
var ArticlesHome = require('./articles/ArticlesHome');

var { actions, helpers, mixins, stores } = Component;

require('./Articles.styl');

module.exports = Component({
  statics: {
    fetchData: params => (
      actions.articlesHotLoad() &&
      helpers.storePromise(ArticlesStore, data => !!data.size)
    )
  },

  mixins: [
    // provides: getViewListProps, getKeyedSubRoute
    mixins.routedViewListHandler({ depth: 2 }),
    mixins.listener(
      stores.ArticlesStore
    )
  ],

  render() {
    return (
      <NestedViewList {...this.getViewListProps()} titleBarProps={{height:48}}>
        <View>
          <ArticlesHome
            hotArticlesStore={stores.HotArticlesStore()}
            articlesStore={stores.ArticlesStore()}
            disable={this.numRoutes() > 2}
            handle={this.props.handle} />
        </View>

        {this.getKeyedSubRoute()}
      </NestedViewList>
    );
  }
});