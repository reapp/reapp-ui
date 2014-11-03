var React = require('react');
var DrawerView = require('ui/views/DrawerView');
var Popover = require('ui/components/Popover');
var PopoverLink = require('ui/components/PopoverLink');
var TitleBar = require('ui/components/TitleBar');
var Block = require('ui/components/Block');
var Button = require('ui/components/Button');
var { Link } = require('react-router');

var PopoversPage = React.createClass({
  render() {
    var MenuButton = <Button iconProps={{type: 'hamburger'}} />;

    return (
      <DrawerView id="PopoversPage">
        <TitleBar right={MenuButton}>
          Popovers
        </TitleBar>
        <Block>
          <p>Popovers are <PopoverLink to="popover1">menus</PopoverLink> that
          will float above an element that triggers them. Apple recommends
          to use popovers on iPad, not smaller mobile devices. For iPhone, use
          actions and modals.</p>
        </Block>
        <Popover id="popover1">
          <Link to="modals">Modals</Link>
          <Link to="popovers">Popovers</Link>
          <Link to="tabs">Tabs</Link>
        </Popover>
      </DrawerView>
    );
  }
});

module.exports = PopoversPage;