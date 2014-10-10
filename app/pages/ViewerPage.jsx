var React = require('react');
var AppLayout = require('../components/layout/AppLayout');
var Images = require('../assets/data/images');
var Viewer = require('../components/viewer/Viewer');
var AppToolbar = require('../components/layout/AppToolbar');
var View = require('../components/ui/views/View');

var NUM_IMAGES = 10;
var START_INDEX = 5;

var ViewerPage = React.createClass({
  title: 'Gallery',

  getInitialState() {
    return {
      width: 0,
      height: 0
    };
  },

  componentDidMount() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    });
  },

  render() {
    if (!this.state.width || !this.state.height) {
      return <div>Loading...</div>;
    }

    return (
      <AppLayout title={this.title}>
        <View id="ViewerPage">
          <Viewer
            width={this.state.width}
            height={this.state.height}
            images={Images} />
        </View>
      </AppLayout>
    );
  }
});

module.exports = ViewerPage;