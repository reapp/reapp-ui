var React = require('react');
var StaticView = require('ui/helpers/StaticView');
var NestedViewList = require('ui/views/NestedViewList');
var View = require('ui/views/View');
var Button = require('ui/components/Button');
var BackButton = require('ui/components/buttons/BackButton');
var { Container } = require('ui/components/Grid');

module.exports = StaticView({
  render() {
    return (
      <div>
        <NestedViewList>
          <View title={[<BackButton />, 'One', <a href="#two">Two</a>]}>
            <Container>
              Example of a deeply nested thing
              <Button href="#two">Button</Button>
            </Container>
          </View>

          <View title={[<a href="#one">One</a>, 'Two', <a href="#three">Three</a>]}>
            <Container>
              This is the first nested View
            </Container>
          </View>
        </NestedViewList>
      </div>
    );
  }
});