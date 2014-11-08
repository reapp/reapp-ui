var React = require('react');
var ReactStyle = require('react-style');
var DrawerView = require('ui/views/DrawerView');
var { Container, Block } = require('ui/components/Grid');
var Button = require('ui/components/Button');

require('./GridsPage.styl');

module.exports = React.createClass({
  styles: ReactStyle({
    textAlign: 'center',
  }),

  render() {
    var containerProps = {
      pad: true
    };

    return (
      <DrawerView
        id="GridsPage"
        styles={this.styles}
        title="Grid System">

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