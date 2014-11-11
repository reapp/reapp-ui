var React = require('react');
var ReactStyle = require('react-style');
var DrawerView = require('ui/views/DrawerView');
var { Container, Block } = require('ui/components/Grid');

module.exports = React.createClass({
  styles: ReactStyle({
    textAlign: 'center',
  }),

  render() {
    return (
      <DrawerView
        id="FormsPage"
        styles={this.styles}
        title="Forms">

        <Container>



        </Container>

      </DrawerView>
    );
  }
});