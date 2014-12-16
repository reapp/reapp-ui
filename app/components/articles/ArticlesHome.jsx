var React = require('react');
var Component = require('component');
var List = require('ui/components/List');
var Button = require('ui/components/Button');
var ListItem = require('ui/components/ListItem');
var View = require('ui/views/View');
var DottedViewList = require('ui/views/DottedViewList');
var ArticleItem = require('./ArticleItem');
var RotatingComponent = require('ui/helpers/RotatingComponent');
var Icon = require('ui/components/Icon');

module.exports = Component({
  getInitialState() {
    return { isRefreshing: false };
  },

  handleRefresh(e) {
    this.setState({ isRefreshing: true });

    if (!this.state.isRefreshing) {
      var unlisten = Component.actions.articlesHotLoadDone.listen(() => {
        this.setState({ isRefreshing: false });
        unlisten();
      });
      Component.actions.articlesHotLoad({ nocache: true });
    }
  },

  handleLoadMore(e) {
    this.setState({ isRefreshing: true });

    e.preventDefault();
    e.target.innerHTML = 'Loading...';

    Component.actions.articlesHotLoadMore();
    var unlisten = Component.actions.articlesHotLoadMoreDone.listen(() => {
      this.setState({ isRefreshing: false });
      unlisten();
    });
  },

  handleArticleHold(id) {
    actions.articleSave(id);
  },

  handleArticleHoldEnd() {
    // todo: alert that it saved
  },

  disableTouchRightProps() {
    return this.props.disable &&
      { touchStartBoundsX: { from: 20, to: window.innerWidth - 20 } };
  },

  render() {
    var {
      savedArticlesStore,
      hotArticlesStore,
      articlesStore,
      handle,
      ...props
    } = this.props;

    var articles = hotArticlesStore
      .map(id => articlesStore.get(id))
      .filter(x => typeof x !== 'undefined');

    var savedArticles = savedArticlesStore
      .map(id => articlesStore.get(id))
      .filter(x => typeof x !== 'undefined');

    // styles: { self: { marginTop: -1 } }
    var refreshButton = (
      <Button
        onClick={this.handleRefresh}
        borderless
        icon={(
          <RotatingComponent rotate={this.state.isRefreshing}>
            <Icon
              name="arrow-refresh"
              size="24"
              stroke="1"
              isInTitleBar />
          </RotatingComponent>
        )} />
    );

    var hasArticles = !!articles.count();
    var hasSavedArticles = !!savedArticles.count();

    return (
      <DottedViewList {...props} {...this.disableTouchRightProps()}>
        <View title={[handle, 'Hot Articles', refreshButton]}>
          <List styles={{ self: { borderTop: 'none' } }} nowrap>
            {hasArticles &&
              articles.map((article, i) =>
                <ArticleItem
                  onTouchHold={this.handleArticleHold.bind(this, article.get('id'))}
                  onTouchHoldDuration={400}
                  onTouchHoldEnd={this.handleArticleHoldEnd}
                  cursor={article}
                  key={i} />
              ).toArray().concat(
                <ListItem
                  style={{textAlign:'center'}}
                  onClick={this.handleLoadMore}>
                  Load More
                </ListItem>
              )
            }

            {!hasArticles &&
              <ListItem style={{textAlign: 'center'}}>Loading...</ListItem>
            }
            </List>
        </View>

        <View title={[handle, 'Saved Articles']}>
          {hasSavedArticles &&
            savedArticles.map((article, i) =>
              <ArticleItem
                cursor={article}
                key={i} />
            ).toArray()
          }

          {!hasSavedArticles &&
            <p>My saved articles. Try swiping an articles to the right to add it here.</p>
          }
        </View>
      </DottedViewList>
    );
  }
});