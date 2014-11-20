var Actions = require('actions/Actions');
var ArticlesStore = require('stores/ArticlesStore');
var Articles = require('../components/articles/Articles');
var ImmutableProps = require('mixins/ImmutableProps');

var ArticlesPage = module.exports = React.createClass({
  mixins: [ImmutableProps(['data', 'views'])],

  statics: {
    fetchData() {
      return new Promise((res, rej) => {
        var dataListener = data => {
          if (data.size) {
            res(data);
            ArticlesStore.unlisten(dataListener);
          }
        };

        ArticlesStore.listen(dataListener);
        Actions.loadArticlesHot();
      });
    }
  },

  getDefaultProps: () => ({
    views: [
      { id: 'hot', title: 'Hot', content: null },
      { id: 'top', title: 'Top', content: null }
    ]
  }),

  render() {
    return Articles('articles', this.getImmutableProps());
  }
});