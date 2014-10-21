var React = require('react');
var Immstruct = require('immstruct');
var ArticleComponent = require('../../components/articles/Article');
var { GetStores } = require('../../flux/bootstrap');

var ArticlePage = React.createClass({
  statics: {
    getAsyncProps: (params) => GetStores(params, ['article'])
  },

  getInitialState() {
    return { version: 0, structure: null };
  },

  componentWillMount() {
    this.setState({
      structure: this.props.article ?
        Immstruct({ article: this.props.article[0].data }) :
        null
    });
  },

  shouldComponentUpdate(nextProps) {
    return nextProps.article && nextProps.article[0];
  },

  render() {
    if (!this.state.structure) return <span />;
    window.articleStruct = this.state.structure;

    this.state.structure.on('next-animation-frame', () => {
      this.setState({ version: ++this.state.version });
    });

    return ArticleComponent(`ArticlePage-${article.id}`, this.state.structure.cursor());
  }
});

module.exports = ArticlePage;