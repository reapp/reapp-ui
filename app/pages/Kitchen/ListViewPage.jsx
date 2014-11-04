var React = require('react');
var DrawerView = require('ui/views/DrawerView');
var TitleBar = require('ui/components/TitleBar');
var BackButton = require('ui/components/buttons/BackButton');
var Block = require('ui/components/Block');
var List = require('ui/components/List');
var { Link } = require('react-router');

var ListViewPage = React.createClass({
  render() {
    return (
      <DrawerView id="ListViewPage" title="ListViewPage">
        <TitleBar left={<BackButton />}>
          Lists
        </TitleBar>
        <Block>
          <p>ListViewPage View</p>
          <List>
            <Link to="modals">Modals</Link>
            <Link to="popovers">Popovers</Link>
            <Link to="tabs">Tabs</Link>
          </List>
        </Block>
      </DrawerView>
    );
  }
});

module.exports = ListViewPage;