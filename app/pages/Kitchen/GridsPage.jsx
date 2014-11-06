var React = require('react');
var DrawerView = require('ui/views/DrawerView');
var { Container, Block } = require('ui/components/Grid');
var Button = require('ui/components/Button');

module.exports = React.createClass({
  render() {
    return (
      <DrawerView title="Grid System">
        <Container>
          <Block pad="1">
            <h3>Buttons</h3>
          </Block>
        </Container>
      </DrawerView>
    );
  }
});