var Component = require('component');
var Articles = require('components/articles/Articles');

var { actions, helpers, mixins } = Component.statics;
var { ArticlesStore } = Component.statics.stores;

module.exports = Component({
  mixins: [mixins.storeListener(ArticlesStore)],

  statics: {
    fetchData() {
      actions.articlesHotLoad();
      return helpers.storePromise(ArticlesStore, data => !!data.size);
    }
  },

  render() {
    return <Articles cursor={ArticlesStore()} />;
  }
});