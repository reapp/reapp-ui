var ArticlesStore = require('stores/ArticlesStore');
var Actions = require('actions/Actions');
var Article = require('components/articles/Article');
var ImmutableProps = require('mixins/ImmutableProps');

var ArticlePage = module.exports = React.createClass({
  mixins: [ImmutableProps(['data'])],

  statics: {
    fetchData(params) {
      return new Promise((res, rej) => {
        Actions.loadArticle(params.id);
        ArticlesStore.listen(data => res(data.get(params.id)));
      });
    }
  },

  render(props) {
    return Article(`Article-${props.data.get('id')}`, this.getImmutableProps());
  }
});