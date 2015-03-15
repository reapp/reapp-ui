var UI = require('../../index');

// you can override this in your app, and mix and match
// these with your own if you'd like, this is just an example
// of using the default iOS theme.

require('./stylesheets');

UI.addConstants(
  require('./constants/base'),
  require('./constants/components')
);

UI.addStyles(require('./styles'));
UI.addAnimations(require('./animations'));