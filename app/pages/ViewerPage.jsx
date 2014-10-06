var React = require('react');
var Images = require('../assets/data/images');
var Viewer = require('../components/viewer/Viewer');
var AppToolbar = require('../components/layout/AppToolbar');
var View = require('../components/ui/View');

var NUM_IMAGES = 10;
var START_INDEX = 5;

var ViewerPage = React.createClass({
  getInitialState() {
    return {
      width: 0,
      height: 0
    };
  },

  componentDidMount() {
    this.setState({
      width: window.innerWidth,//document.documentElement.clientWidth,
      height: window.innerHeight//document.documentElement.clientHeight
    });
  },

  render() {
    if (!this.state.width || !this.state.height) {
      return <div>Loading...</div>;
    }

    return (
      <View id="ViewerPage">
        <AppToolbar />
        <Viewer
          width={this.state.width}
          height={this.state.height}
          images={Images} />
      </View>
    );
  }
});

module.exports = ViewerPage;