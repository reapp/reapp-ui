var React = require('react');
var StaticView = require('ui/helpers/StaticView');
var TitleBar = require('ui/components/TitleBar');
var BackButton = require('ui/components/buttons/BackButton');
var Block = require('ui/components/Block');
var List = require('ui/components/List');
var Icon = require('ui/components/Icon');
var Badge = require('ui/components/Badge');
var Title = require('ui/components/Title');
var ListItem = require('ui/components/ListItem');
var ScrollableMixin = require('ui/mixins/Scrollable');
var { Link } = require('react-router');

var TouchableArea = require('ui/helpers/TouchableArea');
var AnimatableContainer = require('ui/helpers/AnimatableContainer');
var FrostedGlassContainer = require('ui/helpers/FrostedGlassContainer');
var HEADER_HEIGHT = 44;

module.exports = StaticView({
  statics: {
    title: [<BackButton />, 'FrostedGlassContainer']
  },

  mixins: [ScrollableMixin({ scrollY: true })],

  render() {
    var titleBarStyle = { background: 'rgba(255,255,255,0.8)', height:44 };
    var icon = <Icon type="contact" size="28" />;
    var badge = <Badge value="5" />;

    // TODO: we can make this positioning significantly less lame
    // by measuring the DOM but I'm not sure we want to rely on that
    // staying up-to-date, so for now make it explicit.
    var maxHeight = document.body.clientHeight;

    var overlays = {
      header: {
        left: 0,
        top: 0,
        width: '100%',
        height: HEADER_HEIGHT,
        style: {borderBottom: '1px solid rgba(10, 10, 10, 0.1)'},
        children: <TitleBar animations={[]} style={titleBarStyle}>Frosted glass overlay</TitleBar>
      }
    };

    var contentBox = {
      left: 0,
      top: HEADER_HEIGHT - 1,
      width: '100%',
      height: maxHeight - HEADER_HEIGHT + 1,
      style: {backgroundColor: '#fcfcfc'}
    };

    var content = (
      <div>
        <Block>
          <p>ListViewPage View</p>
        </Block>

        <Title>Mail Style Media List</Title>
        <List>
          <ListItem
            title="Facebook"
            titleAfter="8:45"
            titleSub="New messages from Jane Doe"
            wrapper={<a href="http://google.com" />}>
            Lorem ipsume dolor sit amet, consectetur adipiscing
            elit. Nulla sagittis tellus ut turpis condimentium,
            ursula major.
          </ListItem>
        </List>

        <Title>List with Icons</Title>
        <List>
          <ListItem before={icon} after="Whatup">Nate Wienert</ListItem>
          <ListItem before={icon} after={badge}>Nate Wienert</ListItem>
          <ListItem before={icon} after={icon}>Nate Wienert</ListItem>
        </List>

        <Title>List with Links</Title>
        <List>
          <Link to="modals">Modals</Link>
          <Link to="popovers">Popovers</Link>
          <Link to="tabs">Tabs</Link>
        </List>

        <Title>Grouped with Sticky Titles</Title>
        <List title="A">
          {['Adam', 'Alex', 'Annabel']}
        </List>
        <List title="B">
          {['Blair', 'Brenda', 'Byron']}
        </List>
        <List title="C">
          {['Clay', 'Cody', 'Crawford']}
        </List>

        <Title>Inset</Title>
        <List type="inset">
          <Link to="modals">Modals</Link>
          <Link to="popovers">Popovers</Link>
          <Link to="tabs">Tabs</Link>
        </List>

        <Title>Media List</Title>
        <List itemType="media">
          <ListItem before={icon} title="Media Item">
            Lorem ipsum dolor sit amet I don't remember any more.
          </ListItem>
        </List>
      </div>
    );

    return (
      <div>
        <TouchableArea scroller={this.scroller}>
          <FrostedGlassContainer
            className="GlassPage-container"
            style={{height: maxHeight}}
            overlays={overlays}
            content={contentBox}>
            <AnimatableContainer translate={{y: -this.state.scrollY}} ref="content">
              {content}
            </AnimatableContainer>
          </FrostedGlassContainer>
        </TouchableArea>
      </div>
    );
  }
});