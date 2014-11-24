var React = require('react');
var DottedViewList = require('ui/views/DottedViewList');
var DrawerView = require('ui/views/DrawerView');
var BackButton = require('ui/components/buttons/BackButton');
var Block = require('ui/components/Block');

module.exports = React.createClass({
  render() {
    var views = [
      {
        id: 'one',
        title: [<BackButton />, 'One'],
        content: (
          <Block>
            Example of a deeply nested thing
            <a className="button" href="#two">Button</a>
          </Block>
        ),
      },
      {
        id: 'two',
        title: [, 'Two',],
        content: (
          <Block>
            This is the first nested drawer
          </Block>
        )
      },
      {
        id: 'three',
        title: [null, 'Three'],
        content: (
          <Block>
            This is the second deeply nested
          </Block>
        )
      },
      {
        id: 'four',
        title: [null, 'Four'],
        content: (
          <Block>
            Final deeply nested view
          </Block>
        )
      }
    ];

    return (
      <DrawerView>
        <DottedViewList views={views} />
      </DrawerView>
    );
  }
});