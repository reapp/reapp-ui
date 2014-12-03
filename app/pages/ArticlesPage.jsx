var Actions = require('actions/Actions');
var ArticlesStore = require('stores/ArticlesStore');
var Articles = require('../components/articles/Articles');
var StoreRefresh = require('mixins/StoreRefresh');

// module.exports = ImmutableView('Articles', {
//   stores: ['Articles', 'HotArticles'],
//   props: {
//     views: [
//       { id: 'hot', title: 'Hot', content: null },
//       { id: 'top', title: 'Top', content: null }
//     ]
//   },
//   renderComponent: Articles
// });

// for each store we can define a "loaded" function on it
// when we add stores under immutableviews it will automatically listen
// to make sure that it's loaded
// we may need to tie the loaded function to the route....

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
        Actions.loadArticlesHot();
      });
    }
  },

  render() {
    return Articles('articles', {
      cursor: ArticlesStore()
    });
  }
});