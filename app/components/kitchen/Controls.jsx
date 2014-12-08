var React = require('react');
var StaticView = require('ui/helpers/StaticView');
var { Container, Block } = require('ui/components/Grid');
var BackButton = require('ui/components/buttons/BackButton');
var Button = require('ui/components/Button');
var Title = require('ui/components/Title');

module.exports = StaticView({
  statics: {
    title: [<BackButton />, 'Controls']
  },

  render() {
    return (
      <div {...this.props}>
        <Title>Buttons</Title>
        <Container>
          <Button>Hello</Button>
          <Button>Hello</Button>
          <Button>Hello</Button>
        </Container>
      </div>
    );
  }
});