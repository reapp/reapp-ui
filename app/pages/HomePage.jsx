var React = require('react/addons');
var _ = require('lodash-node');
var { FluxMixin, GetStores } = require('../flux');
var GSSMixin = require('../mixins/GSSMixin');
var View = require('../components/ui/views/View');
var TitleBar = require('../components/TitleBar');
var List = require('../components/ui/components/List');
var ArticleItem = require('../components/home/ArticleItem');

require('./HomePage.styl');

module.exports = React.createClass({
  title: 'Home',

  mixins: [FluxMixin],

  statics: {
    getRouteProps: () => GetStores('article')
  },

  render() {
    var Transition = React.addons.CSSTransitionGroup;
    var ArticleView = this.props.activeRouteHandler || function() {
      return <div></div>;
    };

    return (
      <View id="HomePage">
        <TitleBar>{this.title}</TitleBar>
        <List>
          {_.map(this.props.article, (article, i) => {
            return <ArticleItem key={i} article={article.data} />;
          })}
        </List>
        <Transition transitionName="drawer">
          <ArticleView />
        </Transition>
      </View>
    );
  }

});