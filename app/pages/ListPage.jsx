var React = require('react');
var View = require('../components/ui/View');
var AppToolbar = require('../components/layout/AppToolbar');
var SimpleScroller = require('../components/ui/SimpleScroller');
var _ = require('lodash');

var ListPage = React.createClass({
  render() {
    var content = [];

    _.range(100).forEach(function(i) {
      content.push(<p>List Item {i}</p>);
    });

    return (
      <View id="ListPage">
        <AppToolbar />
        <SimpleScroller>
          <div>
            {content}
          </div>
        </SimpleScroller>
      </View>
    );
  }
});

module.exports = ListPage;