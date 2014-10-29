var React = require('react');
var DrawerView = require('ui/views/DrawerView');

var TabsPage = React.createClass({
  render() {
    return (
      <DrawerView id="TabsPage" title="TabsPage">
        TabsPage View
      </DrawerView>
    );
  }
});

module.exports = TabsPage;