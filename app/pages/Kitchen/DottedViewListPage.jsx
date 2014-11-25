var React = require('react');
var DottedViewList = require('ui/views/DottedViewList');
var Drawer = require('ui/views/Drawer');
var TitleBar = require('ui/components/TitleBar');
var BackButton = require('ui/components/buttons/BackButton');
var Block = require('ui/components/Block');

module.exports = React.createClass({
  render() {
    var views = [
      {
        id: 'one',
        title: [,'One'],
        content: (
          <Block>
            Example of a deeply nested thing
            <a className="button" href="#two">Button</a>
          </Block>
        ),
      },
      {
        id: 'two',
        title: [,'Two'],
        content: (
          <Block>
            This is the first nested drawer
          </Block>
        )
      },
      {
        id: 'three',
        title: [,'Three'],
        content: (
          <Block>
            This is the second deeply nested
          </Block>
        )
      },
      {
        id: 'four',
        title: [,'Four'],
        content: (
          <Block>
            Final deeply nested view
          </Block>
        )
      }
    ];

    var titleBarStyles = {
      self: {
        zIndex: 10000,
        background: 'transparent',
        border: 'none'
      }
    };

    return (
      <Drawer>
        <TitleBar left={<BackButton />} styles={titleBarStyles} />
        <DottedViewList views={views} />
      </Drawer>
    );
  }
});