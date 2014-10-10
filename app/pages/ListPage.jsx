var React = require('react');
var View = require('../components/ui/views/View');
var List = require('../components/ui/components/List');
var AppLayout = require('../components/layout/AppLayout');
var _ = require('lodash');

var ListPage = React.createClass({
  title: 'List',

  render() {
    return (
      <AppLayout title={this.title}>
        <View id="ListPage">
          <List>
            {_.range(100).map(i => `List Item ${i}`)}
          </List>
        </View>
      </AppLayout>
    );
  }
});

module.exports = ListPage;