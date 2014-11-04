var React = require('react');
var DrawerView = require('ui/views/DrawerView');
var TitleBar = require('ui/components/TitleBar');
var BackButton = require('ui/components/buttons/BackButton');
var Block = require('ui/components/Block');
var List = require('ui/components/List');
var Icon = require('ui/components/Icon');
var Badge = require('ui/components/Badge');
var ListTitle = require('ui/components/ListTitle');
var ListItem = require('ui/components/ListItem');
var { Link } = require('react-router');

var ListViewPage = React.createClass({
  render() {
    var icon = <Icon type="contact" size="28" />;
    var badge = <Badge value="5" />;

    return (
      <DrawerView id="ListViewPage">
        <TitleBar left={<BackButton />}>
          Lists
        </TitleBar>
        <Block>
          <p>ListViewPage View</p>
        </Block>

        <ListTitle>List with Icons</ListTitle>
        <List>
          <ListItem before={icon} after="Whatup">Nate Wienert</ListItem>
          <ListItem before={icon} after={badge}>Nate Wienert</ListItem>
          <ListItem before={icon} after={icon}>Nate Wienert</ListItem>
        </List>

        <ListTitle>List with Links</ListTitle>
        <List>
          <Link to="modals">Modals</Link>
          <Link to="popovers">Popovers</Link>
          <Link to="tabs">Tabs</Link>
        </List>

        <ListTitle>Grouped with Sticky Titles</ListTitle>
        <List title="A">
          {['Adam', 'Alex', 'Annabel']}
        </List>
        <List title="B">
          {['Blair', 'Brenda', 'Byron']}
        </List>
        <List title="C">
          {['Clay', 'Cody', 'Crawford']}
        </List>

        <ListTitle>Inset</ListTitle>
        <List type="inset">
          <Link to="modals">Modals</Link>
          <Link to="popovers">Popovers</Link>
          <Link to="tabs">Tabs</Link>
        </List>
      </DrawerView>
    );
  }
});

module.exports = ListViewPage;