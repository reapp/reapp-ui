var React = require('react');
var Immstruct = require('immstruct');
var ViewList = require('../../components/ui/views/ViewList');
var DrawerView = require('../../components/ui/views/DrawerView');
var BackButton = require('../../components/ui/components/buttons/BackButton');

require('./Modals.styl');

var Modals = React.createClass({
  render() {
    var views = [
      {
        title: [<BackButton />, 'One'],
        content: 'Example of a deeply nested thing'
      },
      {
        title: [null, 'Two'],
        content: 'This is the first nested drawer'
      },
      {
        title: [null, 'Three'],
        content: 'This is the second deeply nested'
      },
      {
        title: [null, 'Four'],
        content: 'Final deeply nested view'
      }
    ];

    var responds = {
      s: 'single',
      m: 'vertical-split',
      l: 'grid'
    };

    return (
      <ViewList views={views} viewContainer={DrawerView} responds={responds} />
    );
  }
});

module.exports = Modals;