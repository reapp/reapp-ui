require('es-object-assign');

var UI = require('ui');
var Component = require('component');

// statics
Component.addStatics({
  helpers: {
    storePromise: require('./helpers/storePromise')
  },
  mixins: {
    storeListener: require('./mixins/storeListener')
  }
});

// UI
UI.setup({
  constants: [
    require('ui/themes/ios/constants'),
    // require('./themes/hn/constants')
  ],
  animations: [
    require('ui/themes/ios/animations')
  ],
  themes: [
    {
      styles: require('ui/themes/ios/theme'),
      // exclude: ['TitleBar']
    },
    // {
    //   styles: require('./themes/hn/theme'),
    //   // include: ['Dots']
    // }
  ]
});