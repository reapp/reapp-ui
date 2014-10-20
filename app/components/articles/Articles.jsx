var React = require('react/addons');
var Component = require('omniscient');
var View = require('../ui/views/View');
var TitleBar = require('../TitleBar');
var List = require('../ui/components/List');
var TitleView = require('../ui/views/TitleView');
var ArticleItem = require('./ArticleItem');

require('./Articles.styl');

module.exports = Component('Articles', cursor => {
  var Transition = React.addons.CSSTransitionGroup;
  var articles = cursor.get('articles');
  var Article = cursor.get('handler');

  if (!articles)
    return <div></div>;

  return (
    <View id="ArticlePage">
      <TitleBar>Articles</TitleBar>
      <TitleView>
        <List>
          {articles.map(article => (
            ArticleItem({ article: article.get('data') })
          )).toArray()}
        </List>
      </TitleView>
      <Transition transitionName="drawer">
        <Article />
      </Transition>
    </View>
  );
});