var Actions = require('actions/Actions');
var ArticlesStore = require('stores/ArticlesStore');
var Articles = require('../components/articles/Articles');
var StoreRefresh = require('mixins/StoreRefresh');

var ArticlesPage = module.exports = React.createClass({
  mixins: [StoreRefresh('Articles')],

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