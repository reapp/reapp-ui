var React = require('react');
var Component = require('component');
var Actions = require('actions/Actions');
var ArticlesStore = require('stores/ArticlesStore');
var Articles = require('../components/articles/Articles');

module.exports = Component({
  mixins: ['StoreListener'],
  stores: ['Articles'],

  statics: {
    fetchData() {
      return new Promise((res, rej) => {
        var unlisten = ArticlesStore.listen(data => {
          if (data.size) {
            unlisten();
            res(data);
          }
        });
        Actions.articlesHotLoad();
      });
    }
  },

  render() {
    return <Articles cursor={ArticlesStore()} />;
  }
});