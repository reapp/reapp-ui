var Actions = require('actions/Actions');
var ArticlesStore = require('stores/ArticlesStore');
var Articles = require('../components/articles/Articles');

var ArticlesPage = module.exports = React.createClass({
  mixins: [{
    componentWillMount() {
      this.forceUpdater = () => {
        this.forceUpdate();
      };

      ArticlesStore.listen(this.forceUpdater);
    },
    componentWillUnmount() {
      ArticlesStore.unlisten(this.forceUpdater);
    }
  }],

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

  render() {
    return Articles('articles', {
      cursor: ArticlesStore(),
      views: [
        { id: 'hot', title: 'Hot', content: null },
        { id: 'top', title: 'Top', content: null }
      ]
    });
  }
});