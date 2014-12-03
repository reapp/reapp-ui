var React = require('react');
var View = require('ui/views/View');
var { Container, Block } = require('ui/components/Grid');
var BackButton = require('ui/components/buttons/BackButton');
var Button = require('ui/components/Button');
var Title = require('ui/components/Title');

module.exports = React.createClass({
  render() {
    var title = [<BackButton />, 'Controls'];

    return (
      <View {...this.props} title={title}>
        <Title>Buttons</Title>
        <Container>
          <Button>Hello</Button>
          <Button>Hello</Button>
          <Button>Hello</Button>
        </Container>
      </View>
    );
  }
});