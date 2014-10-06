var React = require('react');
var View = require('../components/ui/views/View');
var AppToolbar = require('../components/layout/AppToolbar');
var List = require('../components/ui/components/List');
var _ = require('lodash');

var ListPage = React.createClass({
  render() {
    return (
      <View id="ListPage">
        <AppToolbar />
        <List>
          {_.range(100).map(i => `List Item ${i}`)}
        </List>
      </View>
    );
  }
});

module.exports = ListPage;