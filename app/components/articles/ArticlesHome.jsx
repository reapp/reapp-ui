var React = require('react');
var Component = require('component');
var List = require('ui/components/List');
var Button = require('ui/components/Button');
var ListItem = require('ui/components/ListItem');
var View = require('ui/views/View');
var DottedViewList = require('ui/views/DottedViewList');
var ArticleItem = require('./ArticleItem');

module.exports = Component({
  getInitialState() {
    return { isRefreshing: false };
  },

  componentWillReceiveProps() {
    this.setState({ isRefreshing: false });
  },

  handleRefresh(e) {
    this.setState({ isRefreshing: true });
    Component.actions.articlesHotRefresh();
  },

  handleLoadMore(e) {
    e.preventDefault();
    e.target.innerHTML = 'Loading...';
    Component.actions.articlesHotLoadMore();
    var unlisten = Component.actions.articlesHotLoadDone.listen(() => {
      this.setState({ isRefreshing: false });
      unlisten();
    });
  },

  disableTouchRightProps() {
    return this.props.disable &&
      { touchStartBoundsX: { from: 20, to: window.innerWidth - 20 } };
  },

  render() {
    var { hotArticlesStore, articlesStore, handle, ...props } = this.props;

    var articles = hotArticlesStore
      .map(id => articlesStore.get(id))
      .filter(x => typeof x !== 'undefined');

    var refreshButton = (
      <Button
        iconProps={{
          name: 'arrow-refresh',
          size: 24,
          stroke: 1,
          styles: { self: { marginTop: -1 } },
          animations: this.state.isRefreshing && [{ name: 'rotate', target: 'svg' }]
        }}
        onClick={this.handleRefresh}
        borderless />
    );

    return (
      <DottedViewList {...props} {...this.disableTouchRightProps()}>
        <View title={[handle, 'Hot Articles', refreshButton]}>
          <List styles={{ self: { borderTop: 'none' } }} nowrap>
            {articles.count() ?
              articles.map((article, i) =>
                <ArticleItem cursor={article} key={i} />
              ).toArray()
              .concat(
                <ListItem
                  style={{textAlign:'center'}}
                  onClick={this.handleLoadMore}>
                  Load More
                </ListItem>
              ) :
              <ListItem style={{textAlign: 'center'}}>Loading...</ListItem>
            }
            </List>
        </View>

        <View title={[handle, 'Saved Articles']}>
          <p>My saved articles. Try swiping an articles to the right to add it here.</p>
        </View>
      </DottedViewList>
    );
  }
});