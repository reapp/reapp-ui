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
    'RouteState',
    'RouteHandler',
    'Navigation',
    mixins.listener(
      ArticlesStore,
      actions.articlesHotLoadDone
    )
  ],

  handleViewEntered(i) {
    if (i === 0)
      this.goBack();
  },

  render() {
    var { handle } = this.props;

    var numRoutes = this.getRoutes().length;
    var hasChild = numRoutes > 2;
    var subRouteKey = this.getRoutes().reverse()[0].name + this.getParams().id;

    var articles = HotArticlesStore()
      .map(id => ArticlesStore().get(id))
      .filter(x => typeof x !== 'undefined');

    return (
      <ParallaxViewList
        scrollToStep={numRoutes - 2}
        onViewEntered={this.handleViewEntered}
        noFakeTitleBar>
        <View>
          <ArticlesHome
            disable={numRoutes > 2}
            articles={articles}
            handle={handle}
            hasChild={hasChild} />
        </View>

        {hasChild && this.getRouteHandler(Object.assign(this.props, { key: subRouteKey }))}
      </ParallaxViewList>
    );
  }
});