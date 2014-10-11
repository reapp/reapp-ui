var React = require('react');
var _ = require('lodash');
var View = require('../components/ui/views/View');
var List = require('../components/ui/components/List');
var TitleBar = require('../components/TitleBar');

var ListPage = React.createClass({
  title: 'List',

  render() {
    return (
      <View id="ListPage">
        <TitleBar>{this.title}</TitleBar>
        <List>
          {_.range(100).map(i => `List Item ${i}`)}
        </List>
      </View>
    )
  }
});

module.exports = ListPage;