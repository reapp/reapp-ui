var React = require('react');
var Immstruct = require('immstruct');
var ArticleComponent = require('../../components/articles/Article');
var { FluxMixin, GetStores } = require('../../flux/bootstrap');

var Article = React.createClass({
  mixins: [FluxMixin],

  statics: {
    getAsyncProps: (params) => GetStores(params, ['article'])
  },

  render() {
    console.log('articlePage render');
    if (!this.props.article) return <div />;

    var structure = Immstruct({
      article: this.props.article[0].data
    });

    window.structure2 = structure;
    structure.on('next-animation-frame', this.forceUpdate);
    return ArticleComponent(this.props.article[0].id, structure.cursor());
  }
});

module.exports = Article;