var UI = require('ui');

module.exports = UI.setup({
  constants: [
    require('ui/themes/ios/constants'),
    require('./hn/constants')
  ],
  themes: [
    {
      styles: require('ui/themes/ios'),
      exclude: ['TitleBar']
    },
    {
      styles: require('./hn'),
      include: ['Dots']
    }
  ]
});