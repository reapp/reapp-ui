var React = require('react');
var _ = require('lodash-node');
var View = require('../components/ui/views/View');
var List = require('../components/ui/components/List');
var TitleBar = require('../components/TitleBar');
var debug = require('debug')('g:listPage');

var ListPage = React.createClass({
  title: 'List',

  render() {
    debug('rendering');

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