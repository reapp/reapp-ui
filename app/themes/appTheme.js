var UI = require('ui');

module.exports = UI.setup({
  constants: [
    require('ui/themes/ios/constants'),
    require('./hn/constants')
  ],
  themes: [
    {
      styles: require('ui/themes/ios/theme'),
      // exclude: ['TitleBar']
    },
    {
      styles: require('./hn/theme'),
      // include: ['Dots']
    }
  ]
});