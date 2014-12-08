var React = require('react');
var StaticView = require('ui/helpers/StaticView');
var CardList = require('ui/components/CardList');
var Card = require('ui/components/Card');
var { Container, Block } = require('ui/components/Grid');
var BackButton = require('ui/components/buttons/BackButton');
var Title = require('ui/components/Title');

module.exports = StaticView({
  statics: {
    title: [<BackButton />, 'Cards']
  },

  render() {
    return (
      <div {...this.props}>
        <CardList>
          <Card title="What">Lorem ipsum dolor sit amet</Card>
          <Card title="What">Lorem ipsum dolor sit amet</Card>
          <Card title="What">Lorem ipsum dolor sit amet</Card>
          <Card title="What">Lorem ipsum dolor sit amet</Card>
        </CardList>
      </div>
    );
  }
});