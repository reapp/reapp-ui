var UI = require('ui');

module.exports = UI.setup({
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