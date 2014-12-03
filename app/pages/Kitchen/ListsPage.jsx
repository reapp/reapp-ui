var React = require('react');
var View = require('ui/views/View');
var BackButton = require('ui/components/buttons/BackButton');
var { Container } = require('ui/components/Grid');
var List = require('ui/components/List');
var Icon = require('ui/components/Icon');
var Badge = require('ui/components/Badge');
var Title = require('ui/components/Title');
var ListItem = require('ui/components/ListItem');
var { Link } = require('react-router');

module.exports = React.createClass({
  render() {
    var icon = <Icon type="contact" size="28" />;
    var badge = <Badge value="5" />;

    return (
      <View {...this.props} title={[<BackButton />, 'Lists Page']}>
        <Container>
          <p>ListViewPage View</p>
        </Container>

        <Title>Mail Style Media List</Title>
        <List>
          <ListItem
            title="Facebook"
            titleAfter="8:45"
            titleSub="New messages from Jane Doe"
            wrapper={<a href="http://google.com" />}
            noicon>
            Lorem ipsume dolor sit amet, consectetur adipiscing
            elit. Nulla sagittis tellus ut turpis condimentium,
            ursula major.
          </ListItem>
        </List>

        <Title>Simple Media List</Title>
        <List>
          <ListItem
            before={icon}
            title="Facebook"
            titleSub="New messages from Jane Doe" />
          <ListItem
            before={icon}
            title="Facebook"
            titleSub="New messages from Jane Doe"
            wrapper={<a href="http://google.com" />} />
        </List>

        <Title>List with Icons</Title>
        <List>
          <ListItem
            before={icon}
            after="Whatup"
            wrapper={<a href="http://google.com" />}>
            Nate Wienert
          </ListItem>
          <ListItem
            before={icon}
            after={badge}>
            Nate Wienert
          </ListItem>
          <ListItem
            before={icon}
            after={icon}>
            Nate Wienert
          </ListItem>
        </List>

        <Title>List with Links</Title>
        <List>
          <Link to="modals">Modals</Link>
          <Link to="popovers">Popovers</Link>
          <Link to="tabs">Tabs</Link>
        </List>

        <Title>Grouped with Sticky Titles</Title>
        <List title="A">
          {['Adam', 'Alix', 'Annabel']}
        </List>
        <List title="B">
          {['Billy', 'Brenda', 'Byron']}
        </List>
        <List title="C">
          {['Clay', 'Cody', 'Crystal']}
        </List>

        <Title>Inset</Title>
        <List type="inset">
          <a href="http://google.com">Google</a>
          <Link to="popovers">Popovers</Link>
          <Link to="tabs">Tabs</Link>
        </List>
      </View>
    );
  }
});