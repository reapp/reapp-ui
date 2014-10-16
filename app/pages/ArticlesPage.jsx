var React = require('react/addons');
var _ = require('lodash-node');
var { FluxMixin, GetStores } = require('../flux/bootstrap');
var GSSMixin = require('../mixins/GSSMixin');
var View = require('../components/ui/views/View');
var TitleBar = require('../components/TitleBar');
var List = require('../components/ui/components/List');
var TitleView = require('../components/ui/views/TitleView');
var ArticleItem = require('../components/home/ArticleItem');
var debug = require('debug')('g:articlesPage');

require('./HomePage.styl');

module.exports = React.createClass({
  title: 'Home',

  mixins: [FluxMixin],

  statics: {
    getAsyncProps: () => GetStores(null, ['articles'])
  },

  shouldComponentUpdate(nextProps) {
    return this.props.articles !== nextProps.articles;
  },

  render() {
    debug('props %s', this.props.articles);
    var Transition = React.addons.CSSTransitionGroup;
    var Article = this.props.activeRouteHandler || function() {
      return <div></div>;
    };

    return (
      <View id="HomePage">
        <TitleBar>{this.title}</TitleBar>
        <TitleView>
          <List>
            {_.map(this.props.articles, (article, i) => {
              return <ArticleItem key={i} article={article.data} />;
            })}
          </List>
          <Transition transitionName="drawer">
            <Article />
          </Transition>
        </TitleView>
      </View>
    );
  }

});