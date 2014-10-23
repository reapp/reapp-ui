var React = require('react');
var DrawerView = require('../../components/ui/views/DrawerView');

require('./Modals.styl');

var Modals = React.createClass({
  render() {
    return (
      <DrawerView id="Modals" title="Modals">
        Modals View
      </DrawerView>
    );
  }
});

module.exports = Modals;