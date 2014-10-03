var React = require('react');
var EventPluginHub = require('react/lib/EventPluginHub');
var ResponderEventPlugin = require('./touch/ResponderEventPlugin');
var TapEventPlugin = require('./touch/TapEventPlugin');

var TouchEvents = {
  initialize() {
    EventPluginHub.injection.injectEventPluginsByName({
      ResponderEventPlugin: ResponderEventPlugin,
      TapEventPlugin: TapEventPlugin
    });

    React.initializeTouchEvents(true);
  }
};

module.exports = TouchEvents;