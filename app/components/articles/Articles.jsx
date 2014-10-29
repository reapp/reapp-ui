var React = require('react/addons');
var Component = require('carpo');
var View = require('ui/views/View');
var ViewLeft = require('ui/views/ViewLeft');
var ViewMain = require('ui/views/ViewMain');
var DottedViewList = require('ui/views/DottedViewList');
var TitleBar = require('ui/components/TitleBar');
var List = require('ui/components/List');
var ArticleItem = require('./ArticleItem');
var Transition = React.addons.CSSTransitionGroup;

require('./Articles.styl');

module.exports = Component({
  name: 'Articles',

  mixins: [
    {
      handleViewEnter() {
        console.log('VIEW ENTER');
      }
    }
  ],

  render(cursor) {
    var articles = cursor.get('articles');
    if (!articles) return <div></div>;

    var content = cursor.get('handler')();
    if (content)
      content = <div className="drawer-parent">{content}</div>;

    var views = [
      {
        id: 'hot',
        title: 'Hot',
        content: (
          <List>
            {articles.map(article => (
              ArticleItem(`Articles-ArticleItem-${article.get('id')}`, article.get('data'))
            )).toArray()}
          </List>
        )
      },
      {
        id: 'top',
        title: 'Top',
        content: (
          <List>
            {articles.map(article => (
              ArticleItem(`Articles-ArticleItem-${article.get('id')}`, article.get('data'))
            )).toArray()}
          </List>
        )
      }
    ];

    return (
      <div id="ArticlesPage">
        <ViewLeft id="articlesLeftView">
          <DottedViewList views={views} onViewEnter={this.handleViewEnter} />
        </ViewLeft>

        <ViewMain>
          <Transition transitionName="drawer">
            {content}
          </Transition>
        </ViewMain>
      </div>
    );
  }
});