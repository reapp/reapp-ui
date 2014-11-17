var React = require('react');
var DrawerView = require('ui/views/DrawerView');
var { Container, Block } = require('ui/components/Grid');
var BackButton = require('ui/components/buttons/BackButton');
var Button = require('ui/components/Button');

module.exports = React.createClass({
  render() {
    var title = [<BackButton />, 'Lists'];

    return (
      <DrawerView title={title}>
        <h3>Buttons</h3>
        <Container>
          <Block>
            <Button>Hello</Button>
          </Block>
          <Block>
            <Button>Hello</Button>
          </Block>
          <Block>
            <Button>Hello</Button>
          </Block>
        </Container>
      </DrawerView>
    );
  }
});