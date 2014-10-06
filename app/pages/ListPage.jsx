var React = require('react');
var View = require('../components/ui/View');
var AppToolbar = require('../components/layout/AppToolbar');
var SimpleScroller = require('../components/ui/SimpleScroller');
var List = require('../components/ui/List');
var _ = require('lodash');

var ListPage = React.createClass({
  render() {
    var content = [];

    _.range(100).forEach(function(i) {
      content.push(`List Item ${i}`);
    });

    return (
      <View id="ListPage">
        <AppToolbar />
        <SimpleScroller>
          <List>
            {content}
          </List>
        </SimpleScroller>
      </View>
    );
  }
});

module.exports = ListPage;