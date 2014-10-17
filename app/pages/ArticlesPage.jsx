var React = require('react/addons');
var _ = require('lodash-node');
var { FluxMixin, GetStores } = require('../flux/bootstrap');
var GSSMixin = require('../mixins/GSSMixin');
var View = require('../components/ui/views/View');
var TitleBar = require('../components/TitleBar');
var List = require('../components/ui/components/List');
var TitleView = require('../components/ui/views/TitleView');
var ArticleItem = require('../components/articles/ArticleItem');
var debug = require('debug')('g:articlesPage');

require('./ArticlesPage.styl');

module.exports = React.createClass({
  title: 'Article',

  mixins: [FluxMixin],

  statics: {
    getAsyncProps: () => GetStores(null, ['articles'])
  },

  render() {
    debug('props', this.props);
    var Transition = React.addons.CSSTransitionGroup;
    var Article = this.props.activeRouteHandler || function() {
      return <div></div>;
    };

    return (
      <View id="ArticlePage">
        <TitleBar>{this.title}</TitleBar>
        <TitleView>
          <List>
            {_.map(this.props.articles, (article) => {
              return <ArticleItem key={article.id} article={article.data} />;
            })}
          </List>
        </TitleView>
        <Transition transitionName="drawer">
          <Article />
        </Transition>
      </View>
    );
  }

});