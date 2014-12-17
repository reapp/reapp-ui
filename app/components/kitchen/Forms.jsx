var React = require('react');
var StaticView = require('ui/helpers/StaticView');
var BackButton = require('ui/components/buttons/BackButton');
var Button = require('ui/components/Button');
var ButtonRow = require('ui/components/ButtonRow');
var Title = require('ui/components/Title');
var List = require('ui/components/List');
var { Container, Block } = require('ui/components/Grid');
var Form = require('ui/components/Form');
var Label = require('ui/components/Label');
var Input = require('ui/components/Input');

module.exports = StaticView({
  statics: {
    title: [<BackButton />, "Forms"]
  },

  render() {
    return (
      <div>
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

        <Container>
          <Title>Checkboxes &amp; Radios</Title>
        </Container>
        <Container>
          <Form>
            <List>
              <Input type="checkbox" label="Work" />
            </List>

            <Title>Radio Group</Title>
            <List>
              <Input type="radio" name="food[bacon]" label="Bacon" />
              <Input type="radio" name="food[ham]" label="Ham" />
              <Input type="radio" name="food[potatos]" label="Sweet Potatos" />
              <Input type="radio" name="food[yams]" label="Yams" />
            </List>
          </Form>
        </Container>

        <Container>
          <Title>Elements</Title>
        </Container>
        <Container>
          <form>
            <List>
              <Input name="name" placeholder="Your Name" />
              <Input name="email" type="email" placeholder="Your Email" />
              <Input name="url" type="url" placeholder="URL" />
              <Input name="password" type="password" placeholder="password" />
              <Input name="phone" type="phone" placeholder="(555)-555-5555" />
            </List>
          </form>
        </Container>
      </div>
    );
  }
});