var { makeTheme } = require('../../index');
var requirer = (name) => require('./styles/' + name);

module.exports = makeTheme(requirer, [
  'Badge',
  'Block',
  'Button',
  'ButtonRow',
  'Container',
  'DottedViewList',
  'Dots',
  'Drawer',
  'LayoutLeftNav',
  'List',
  'ListItem',
  'Menu',
  'Modal',
  'Pad',
  'Popover',
  'TabItem',
  'Tabs',
  'Title',
  'TitleBar',
  'View',
  'ViewLeft',
  'ViewList',
  'ViewMain'
]);