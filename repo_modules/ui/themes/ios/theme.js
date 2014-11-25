var { makeTheme } = require('../../index');
var requirer = (name) => require('./styles/' + name);

module.exports = makeTheme(requirer, [
  'Badge',
  'Block',
  'Button',
  'Container',
  'DottedViewList',
  'Dots',
  'List',
  'ListItem',
  'ListTitle',
  'Menu',
  'Modal',
  'Pad',
  'Popover',
  'TitleBar',
  'View',
  'ViewLeft',
  'ViewList',
  'ViewMain'
]);