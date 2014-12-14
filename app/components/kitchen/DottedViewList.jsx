var React = require('react');
var StaticView = require('ui/helpers/StaticView');
var DottedViewList = require('ui/views/DottedViewList');
var View = require('ui/views/View');
var BackButton = require('ui/components/buttons/BackButton');
var Block = require('ui/components/Block');

module.exports = StaticView({
  statics: {
    title: [<BackButton />, 'Dotted View List']
  },

  render() {
    return (
      <DottedViewList>
        <View id="one" title={[,'One']}>
          <Block>
            First
            <a className="button" href="#two">Button</a>
          </Block>
        </View>

        <View id="two" title={[,'Two']}>
          <Block>
            Second
          </Block>
        </View>

        <View id="three" title={[,'Three']}>
          <Block>
            Third
          </Block>
        </View>

        <View id="four" title={[,'Four']}>
          <Block>
            Fourth
          </Block>
        </View>
      </DottedViewList>
    );
  }
});