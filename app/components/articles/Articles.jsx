var React = require('react/addons');
var Component = require('omniscient');
var DraggableView = require('../ui/views/DraggableView');
var View = require('../ui/views/View');
var TitleBar = require('../TitleBar');
var List = require('../ui/components/List');
var TitleView = require('../ui/views/TitleView');
var ArticleItem = require('./ArticleItem');
var Transition = React.addons.CSSTransitionGroup;

require('./Articles.styl');

module.exports = Component('Articles', function(cursor) {
  console.log('articles cursor', cursor);
  var articles = cursor.get('articles');
  if (!articles) return <div></div>;

  var Handler = cursor.get('handler')(cursor.get('handlerId'));
  var Drawer = DraggableView.bind(this, {
    className: 'article drawer',
    layer: 2, // todo integrate into app state to manage index
    viewProps: { style: { paddingTop: 0 } }
  });

  var SubView = Handler ? <Drawer>{Handler}</Drawer> : <div></div>;

  return (
    <View id="ArticlePage">
      <TitleBar>Articles</TitleBar>
      <TitleView>
        <List>
          {articles.map(article => (
            ArticleItem(article.get('id'), { article: article.get('data') })
          )).toArray()}
        </List>
      </TitleView>
      <Transition transitionName="drawer">
        {SubView}
      </Transition>
    </View>
  );
});