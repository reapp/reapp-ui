var React = require('react');
var DrawerView = require('ui/views/DrawerView');
var { Container, Block } = require('ui/components/Grid');
var Button = require('ui/components/Button');

module.exports = React.createClass({
  render() {
    return (
      <DrawerView title="Controls">
        <Container>
          <Block
            cols={{ xs: 12, s: 3, m: 2,  lg: 1 }}
            offs={{ xs: 0,  s: 9, m: 10, lg: 11 }}>
            <h3>Buttons</h3>
          </Block>
        </Container>
      </DrawerView>
    );
  }
});