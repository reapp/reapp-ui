var React = require('react');
var StaticView = require('ui/helpers/StaticView');
var Drawer = require('ui/components/Drawer');
var { Container, Block } = require('ui/components/Grid');
var BackButton = require('ui/components/buttons/BackButton');
var Button = require('ui/components/Button');

module.exports = StaticView({
  statics: {
    title: [<BackButton />, 'Panels']
  },

  title: 'Panels',

  getInitialState() {
    return {
      bottomClosed: true,
      leftClosed: true,
      topClosed: true,
      rightClosed: true
    };
  },

  toggleBottomView() {
    this.setState({ bottomClosed: !this.state.bottomClosed });
  },

  toggleLeftView() {
    this.setState({ leftClosed: !this.state.leftClosed });
  },

  toggleRightView() {
    this.setState({ rightClosed: !this.state.rightClosed });
  },

  toggleTopView() {
    this.setState({ topClosed: !this.state.topClosed });
  },

  render() {
    var title = [<BackButton />, this.title];

    return (
      <div>
        <h3>{this.title}</h3>
        <p>Panels slide out from a side of the screen</p>
        <Container>
          <Button onClick={this.toggleTopView}>Top</Button>
          <Button onClick={this.toggleBottomView}>Bottom</Button>
          <Button onClick={this.toggleRightView}>Right</Button>
          <Button onClick={this.toggleLeftView}>Left</Button>
        </Container>

        <Drawer type="bottom" closed={this.state.bottomClosed}>
          <p>Lorem ipsum</p>
        </Drawer>

        <Drawer type="top" closed={this.state.topClosed}>
          <p>Lorem ipsum</p>
        </Drawer>

        <Drawer type="left" closed={this.state.leftClosed}>
          <p>Lorem ipsum</p>
        </Drawer>

        <Drawer type="right" closed={this.state.rightClosed}>
          <p>Lorem ipsum</p>
        </Drawer>
      </div>
    );
  }
});