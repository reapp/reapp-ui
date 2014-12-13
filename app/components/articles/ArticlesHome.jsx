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
    actions.articlesHotRefresh();
  },

  handleLoadMore(e) {
    e.preventDefault();
    e.target.innerHTML = 'Loading...';
    actions.articlesHotLoadMore();
    var unlisten = actions.articlesHotLoadDone.listen(() => {
      this.setState({ isRefreshing: false });
      unlisten();
    });
  },

  render() {
    var { articles, hasChild, handle, ...props } = this.props;

    var refreshIconProps = {
      name: 'arrow-refresh',
      size: 24,
      stroke: 1,
      styles: { self: { marginTop: -1 } },
      animations: this.state.isRefreshing ? [{ name: 'rotate' }] : null
    };

    var refreshButton = (
      <Button
        iconProps={refreshIconProps}
        onClick={this.handleRefresh}
        borderless />
    );

    var dottedProps =  hasChild ?
      { touchStartBoundsX: { from: 20, to: window.innerWidth - 20 } } :
      null;

      console.log('render', props)
    return (
      <DottedViewList {...props} {...dottedProps}>
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

        <View title={[handle, 'Saved Articles']} />
      </DottedViewList>
    );
  }
});