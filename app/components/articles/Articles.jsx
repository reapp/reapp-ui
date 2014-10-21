var React = require('react/addons');
var Component = require('omniscient');
var View = require('../ui/views/View');
var TitleBar = require('../TitleBar');
var List = require('../ui/components/List');
var TitleView = require('../ui/views/TitleView');
var ArticleItem = require('./ArticleItem');

require('./Articles.styl');

module.exports = Component('Articles', function(cursor) {
  console.log('articles cursor', cursor);
  var articles = cursor.get('articles');
  if (!articles) return <div></div>;

  var Handler = cursor.get('handler')() || <div />;
  var Transition = React.addons.CSSTransitionGroup;

  return (
    <View id="ArticlesPage">
      <TitleBar>Articles</TitleBar>
      <TitleView>
        <List>
          {articles.map(article => (
            ArticleItem(`Articles-${article.get('id')}`, { article: article.get('data') })
          )).toArray()}
        </List>
      </TitleView>
      <Transition transitionName="drawer">
        {Handler}
      </Transition>
    </View>
  );
});