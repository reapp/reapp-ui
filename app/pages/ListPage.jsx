var React = require('react');
var View = require('../components/ui/View');
var AppToolbar = require('../components/layout/AppToolbar');
var SimpleScroller = require('../components/ui/SimpleScroller');
var List = require('../components/ui/List');
var _ = require('lodash');

var ListPage = React.createClass({
  render() {
    return (
      <View id="ListPage">
        <AppToolbar />
        <SimpleScroller options={{scrollingX: false}}>
          <List>
            {_.range(100).map(i => `List Item ${i}`)}
          </List>
        </SimpleScroller>
      </View>
    );
  }
});

module.exports = ListPage;