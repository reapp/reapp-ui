var React = require('react');
var Component = require('component');
var ViewList = require('ui/views/ViewList');
var View = require('ui/views/View');
var ArticlesHome = require('./articles/ArticlesHome');
var { actions, helpers, mixins } = Component;
var { ArticlesStore, HotArticlesStore } = Component.stores;

require('./Articles.styl');

module.exports = Component({
  mixins: [
    'RouteState',
    'RouteHandler',
    mixins.listener(
      ArticlesStore,
      actions.articlesHotLoadDone
    )
  ],

  statics: {
    fetchData() {
      actions.articlesHotLoad();
      return helpers.storePromise(ArticlesStore, data => !!data.size);
    }
  },

  getInitialState() {
    return { disableDottedViewList: false };
  },

  handleViewEntering(i) {
    debugger;
    this.setState({ disableDottedViewList: (i > 0) });
  },

  render() {
    var { handle } = this.props;
    console.log('render')

    var numRoutes = this.getRoutes().length;
    var hasChild = numRoutes > 2;
    var subRouteKey = this.getRoutes().reverse()[0].name + this.getParams().id;

    var articles = HotArticlesStore()
      .map(id => ArticlesStore().get(id))
      .filter(x => typeof x !== 'undefined');

      console.log('aritcles render disable', this.state.disableDottedViewList)
    return (
      <ViewList
        scrollToStep={numRoutes - 2}
        onViewEntering={this.handleViewEntering}
        noFakeTitleBar>
        <View>
          <ArticlesHome
            disable={this.state.disableDottedViewList}
            articles={articles}
            handle={handle}
            hasChild={hasChild} />
        </View>

        {hasChild && this.getRouteHandler(Object.assign(this.props, { key: subRouteKey }))}
      </ViewList>
    );
  }
});