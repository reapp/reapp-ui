var React = require('react/addons');
var Component = require('carpo');
var View = require('ui/views/View');
var List = require('ui/components/List');
var ViewLeft = require('ui/views/ViewLeft');
var ViewMain = require('ui/views/ViewMain');
var DottedViewList = require('ui/views/DottedViewList');
var Transition = React.addons.CSSTransitionGroup;

require('./Articles.styl');

module.exports = Component({
  name: 'Articles',

  mixins: [
    {
      handleViewEnter(i) {
        console.log('VIEW ENTER', arguments);
      },
      handleViewLeave(i) {
        console.log('VIEW LEAVE', arguments);
      }
    }
  ],

  render(cursor) {
    var articles = cursor.get('articles');
    if (!articles) return <div></div>;

    var content = cursor.get('handler')();
    if (content)
      content = <div className="drawer-parent">{content}</div>;

    cursor.get('views').forEach((view, i) => {
      console.log('view', view, i);
      cursor.updateIn(['views', i, 'content'], content => {
        console.log('content', content)
        return (
          <List>
            {articles.map(article => (
              ArticleItem(`Articles-ArticleItem-${article.get('id')}`, article.get('data'))
            )).toArray()}
          </List>
        );
      });
    });

    var views = cursor.get('views').toArray().map(v => v.toJS());
    console.log(views);

    return (
      <div id="ArticlesPage">
        <ViewLeft id="articlesLeftView">
          <DottedViewList
            views={views}
            onViewLeave={this.handleViewLeave}
            onViewEnter={this.handleViewEnter}
            onTouchStart={this.handleTouchStart} />
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