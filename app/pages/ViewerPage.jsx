var React = require('react');
var Images = require('../assets/data/images');
var Viewer = require('../components/viewer/Viewer');
var View = require('ui/views/View');
var TitleBar = require('ui/components/TitleBar');
var debug = require('debug')('g:viewerPage');

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
    debug('rendering');

    if (!this.state.width || !this.state.height) {
      return <div>Loading...</div>;
    }

    return (
      <View id="ViewerPage">
        <TitleBar>{this.title}</TitleBar>
        <Viewer
          width={this.state.width}
          height={this.state.height}
          images={Images} />
      </View>
    );
  }
});

module.exports = ViewerPage;