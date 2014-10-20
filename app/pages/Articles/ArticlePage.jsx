var React = require('react');
var Immstruct = require('immstruct');
var ArticleComponent = require('../../components/articles/Article');
var { GetStores } = require('../../flux/bootstrap');

var Article = React.createClass({
  statics: {
    getAsyncProps: (params) => GetStores(params, ['article'])
  },

  render() {
    if (!this.props.article) return null;

    var structure = Immstruct({
      article: this.props.article[0].data
    });

    window.structure2 = structure;
    structure.on('next-animation-frame', this.forceUpdate);
    return ArticleComponent(structure.cursor());
  }
});

module.exports = Article;