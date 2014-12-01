var React = require('react');
var DrawerView = require('ui/views/DrawerView');
var Tabs = require('ui/components/Tabs');
var TabItem = require('ui/components/TabItem');
var Button = require('ui/components/Button');
var BackButton = require('ui/components/buttons/BackButton');
var { Container, Block } = require('ui/components/Grid');

module.exports = React.createClass({
  getInitialState() {
    return { tabsType: 'text' };
  },

  handleTabType(e) {
    this.setState({ tabsType: e.target.getAttribute('data-type') });
  },

  render() {
    var tabContents = {
      text: [
        <TabItem>Feed</TabItem>,
        <TabItem>Stream</TabItem>,
        <TabItem>Board</TabItem>
      ]
    };

    return (
      <DrawerView id="TabsPage" title={[<BackButton />, "TabsPage"]}>
        <Container>
          <Block>
            <h3>Tabs</h3>
            <p>Tabs are something</p>
          </Block>
        </Container>

        <Container>
          <Block>
            <Button onClick={this.handleTabType} dataType="text">Text</Button>
            <Button onClick={this.handleTabType} dataType="icon">Icon</Button>
            <Button onClick={this.handleTabType} dataType="icon-text">Icon + Text</Button>
            <Button onClick={this.handleTabType} dataType="icon-text-right">Icon + Text (Right)</Button>
          </Block>
        </Container>

        <Tabs type={this.state.tabsType}>
          {tabContents[this.state.tabsType]}
        </Tabs>
      </DrawerView>
    );
  }
});