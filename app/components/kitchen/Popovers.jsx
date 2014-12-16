var React = require('react');
var View = require('ui/views/View');
var PopoverLink = require('ui/components/PopoverLink');
var ShowPopover = require('ui/actions/ShowPopover');
var { Container } = require('ui/components/Grid');
var Button = require('ui/components/Button');
var BackButton = require('ui/components/buttons/BackButton');
var { Link } = require('react-router');

var PopoversPage = React.createClass({
  render() {
    return (
      <div>
        <Container>
          <p>Popovers
          are <PopoverLink content={this.props.content}>menus</PopoverLink> that
          will float above an element that triggers them. Apple recommends
          to use popovers on iPad, not smaller mobile devices. For iPhone, use
          actions and modals.</p>
        </Container>
      </div>
    );
  }
});

module.exports = React.createClass({
  render() {
    var popoverContent = [
      <Link to="modals">Modals</Link>,
      <Link to="popovers">Popovers</Link>,
      <Link to="tabs">Tabs</Link>
    ];

    var menuButton = (
      <Button
        iconProps={{
          name: 'hamburger',
          size: 24,
          stroke: 1,
          shapeRendering: 'crispEdges',
        }}
        onClick={ShowPopover.bind(null, { content: popoverContent })}
        chromeless />
    );

    return (
      <View {...this.props} title={[<BackButton />, 'Popovers', menuButton]}>
        <PopoversPage {...this.props} content={popoverContent} />
      </View>
    );
  }
});