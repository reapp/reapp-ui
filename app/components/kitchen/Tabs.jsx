var React = require('react');
var StaticView = require('ui/helpers/StaticView');
var Tabs = require('ui/components/Tabs');
var TabItem = require('ui/components/TabItem');
var Button = require('ui/components/Button');
var BackButton = require('ui/components/buttons/BackButton');
var { Container, Block } = require('ui/components/Grid');

module.exports = StaticView({
  statics: {
    title: [<BackButton />, 'Tabs']
  },

  getInitialState() {
    return { tabsType: 'text' };
  },

  handleTabType(e) {
    this.setState({ tabsType: e.currentTarget.getAttribute('data-type') });
  },

  render() {
    var tabContents = {
      text: [
        <TabItem>Feed</TabItem>,
        <TabItem>Stream</TabItem>,
        <TabItem>Board</TabItem>
      ],

      icon: [
        <TabItem icon="mailbox" />,
        <TabItem icon="stopwatch" />,
        <TabItem icon="star" />
      ],

      'icon-text': [
        <TabItem icon="mailbox" text="Mailbox" />,
        <TabItem icon="stopwatch" text="Stopwatch" />,
        <TabItem icon="star" text="Star" />
      ],

      'icon-text-right': [
        <TabItem icon="mailbox" text="Mailbox" />,
        <TabItem icon="stopwatch" text="Stopwatch" />,
        <TabItem icon="star" text="Star" />
      ]
    };

    return (
      <div>
        <Container>
          <Block>
            <h3>Tabs</h3>
            <p>Tabs are something</p>
          </Block>
        </Container>

        <Container>
          <Button onClick={this.handleTabType} data-type="text">Text</Button>
        </Container>

        <Container>
          <Button onClick={this.handleTabType} data-type="icon">Icon</Button>
        </Container>

        <Container>
          <Button onClick={this.handleTabType} data-type="icon-text">Icon + Text</Button>
        </Container>

        <Container>
          <Button onClick={this.handleTabType} data-type="icon-text-right">Icon + Text (Right)</Button>
        </Container>

        <Tabs type={this.state.tabsType}>
          {tabContents[this.state.tabsType]}
        </Tabs>
      </div>
    );
  }
});