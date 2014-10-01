var React = require('react');
// var Images = require('../data/Images');
var Viewer = require('../components/viewer/Viewer');

var EventPluginHub = require('react/lib/EventPluginHub');
var ResponderEventPlugin = require('../components/touch/ResponderEventPlugin');
var TapEventPlugin = require('../components/touch/TapEventPlugin');

EventPluginHub.injection.injectEventPluginsByName({
  ResponderEventPlugin: ResponderEventPlugin,
  TapEventPlugin: TapEventPlugin
});

React.initializeTouchEvents(true);

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
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    });
  },

  render() {
    if (!this.state.width || !this.state.height) {
      return <div>Loading...</div>;
    }

    return (
      <Viewer
        width={this.state.width}
        height={this.state.height - Layout.TOPBAR_HEIGHT}
        images={Images} />
    );
  }
});

module.exports = ViewerPage;