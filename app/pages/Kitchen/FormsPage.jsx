var React = require('react');
var ReactStyle = require('react-style');
var View = require('ui/views/View');
var BackButton = require('ui/components/buttons/BackButton');
var Button = require('ui/components/Button');
var ButtonRow = require('ui/components/ButtonRow');
var Title = require('ui/components/Title');
var { Container, Block } = require('ui/components/Grid');

module.exports = React.createClass({
  render() {
    return (
      <View {...this.props} title={[<BackButton />, "Forms"]}>
        <Container>
          <Title>Buttons</Title>
        </Container>
        <Container>
          <Button active>Active</Button>
          <Button>Button</Button>
          <Button rounded>Round</Button>
        </Container>
        <Container>
          <ButtonRow>
            <Button>Button</Button>
            <Button>Button</Button>
          </ButtonRow>
        </Container>
        <Container>
          <ButtonRow rounded>
            <Button>Button</Button>
            <Button active>Button</Button>
            <Button>Button</Button>
          </ButtonRow>
        </Container>
      </View>
    );
  }
});