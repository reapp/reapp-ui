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
        id: 'one',
        title: [<BackButton />, 'One'],
        content: (
          <div>
            Example of a deeply nested thing
            <a href="#two">Button</a>
          </div>
        ),
      },
      {
        id: 'two',
        title: [null, 'Two'],
        content: 'This is the first nested drawer'
      },
      {
        id: 'three',
        title: [null, 'Three'],
        content: 'This is the second deeply nested'
      },
      {
        id: 'four',
        title: [null, 'Four'],
        content: 'Final deeply nested view'
      }
    ];

    return (
      <ViewList views={views} />
    );
  }
});

module.exports = Modals;