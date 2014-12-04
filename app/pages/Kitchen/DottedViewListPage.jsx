var React = require('react');
var StaticView = require('ui/helpers/StaticView');
var DottedViewList = require('ui/views/DottedViewList');
var BackButton = require('ui/components/buttons/BackButton');
var Block = require('ui/components/Block');

module.exports = StaticView({
  statics: {
    title: [<BackButton />, 'Dotted View List']
  },

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

    return (
      <div>
        <DottedViewList views={views} />
      </div>
    );
  }
});