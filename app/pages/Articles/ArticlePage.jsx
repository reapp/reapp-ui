var Component = require('component');
var Article = require('components/articles/Article');
var View = require('ui/views/View');

var { actions, helpers, mixins } = Component;
var { ArticlesStore } = Component.stores;

module.exports = Component({
  mixins: ['rr.State'],

  statics: {
    fetchData(params) {
      actions.articleLoad(params.id);
      return helpers.storePromise(ArticlesStore, data => {
        var article = data.get(params.id);
        return article && article.get('status') === 'LOADED';
      });
    }
  },

  render() {
    var cursor = ArticlesStore().get(this.getParams().id);
    return cursor ?
      <Article {...this.props} cursor={cursor} /> :
      <View />;
  }
});