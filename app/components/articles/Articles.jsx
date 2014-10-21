var React = require('react/addons');
var Component = require('omniscient');
var View = require('../ui/views/View');
var ViewLeft = require('../ui/views/ViewLeft');
var ViewMain = require('../ui/views/ViewMain');
var TitleBar = require('../TitleBar');
var List = require('../ui/components/List');
var ArticleItem = require('./ArticleItem');
var Transition = React.addons.CSSTransitionGroup;

require('./Articles.styl');

module.exports = Component('Articles', function(cursor) {
  var articles = cursor.get('articles');
  if (!articles) return <div></div>;

  var Handler = cursor.get('handler')({ parent: this.refs.leftView });
  if (Handler) Handler = <div className="drawer-parent">{Handler}</div>;

  var LeftTitle = <TitleBar>Articles</TitleBar>;

  return (
    <View id="ArticlesPage">
      <ViewLeft ref="leftView" title={LeftTitle}>
        <ul id="subBar">
          <li>Hot</li>
          <li>Top</li>
          <li>New</li>
        </ul>
        <List>
          {articles.map(article => (
            ArticleItem(`Articles-${article.get('id')}`, { article: article.get('data') })
          )).toArray()}
        </List>
      </ViewLeft>

      <ViewMain>
        <Transition transitionName="drawer">
          {Handler}
        </Transition>
      </ViewMain>
    </View>
  );
});