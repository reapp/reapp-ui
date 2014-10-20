var React = require('react/addons');
var Component = require('omniscient');
var View = require('../ui/views/View');
var TitleBar = require('../TitleBar');
var List = require('../ui/components/List');
var TitleView = require('../ui/views/TitleView');
var ArticleItem = require('./ArticleItem');

module.exports = Component('ArticlePage', (cursor) => {
  var Transition = React.addons.CSSTransitionGroup;
  var articles = cursor.get('articles');
  var Article = cursor.get('handler');

  if (!articles)
    return <div></div>;

  return (
    <View id="ArticlePage">
      <TitleBar>{this.title}</TitleBar>
      <TitleView>
        <List>
          {articles.map((article) => (
            <ArticleItem
              key={article.get('id')}
              article={article.get('data').toObject()} />
          )).toArray()}
        </List>
      </TitleView>
      <Transition transitionName="drawer">
        <Article />
      </Transition>
    </View>
  );
});