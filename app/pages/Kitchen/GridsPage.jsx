var React = require('react');
var DrawerView = require('ui/views/DrawerView');
var BackButton = require('ui/components/buttons/BackButton');
var { Container, Block } = require('ui/components/Grid');

require('./GridsPage.styl');

module.exports = React.createClass({
  styles: {
    textAlign: 'center',
  },

  render() {
    var containerProps = {
      pad: true,
      styles: { textAlign: 'center' }
    };

    return (
      <DrawerView
        id="GridsPage"
        styles={this.styles}
        title={[<BackButton />, "Grid System"]}>

        <Container {...containerProps}>
          <Block>1</Block>
        </Container>

        <Container {...containerProps}>
          <Block>1</Block>
          <Block>2</Block>
        </Container>

        <Container {...containerProps}>
          <Block>1</Block>
          <Block>2</Block>
          <Block>3</Block>
        </Container>

        <Container {...containerProps}>
          <Block>1</Block>
          <Block>2</Block>
          <Block>3</Block>
          <Block>4</Block>
        </Container>

        <Container {...containerProps}>
          <Block>1</Block>
          <Block>2</Block>
          <Block>3</Block>
          <Block>4</Block>
          <Block>5</Block>
        </Container>

        <Container {...containerProps}>
          <Block>1</Block>
          <Block>2</Block>
          <Block>3</Block>
          <Block>4</Block>
          <Block>5</Block>
          <Block>6</Block>
        </Container>
      </DrawerView>
    );
  }
});