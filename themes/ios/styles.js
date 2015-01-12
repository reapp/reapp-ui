var { makeStyles } = require('../../index');
var requirer = (name) => require('./styles/' + name);

module.exports = makeStyles(requirer, [
  'Badge',
  'Block',
  'Button',
  'ButtonGroup',
  'Card',
  'CardList',
  'Checkbox',
  'Container',
  'DottedViewList',
  'Dots',
  'Drawer',
  'Form',
  'Input',
  'Label',
  'LayoutLeftNav',
  'List',
  'ListItem',
  'Menu',
  'Modal',
  'NestedViewList',
  'Pad',
  'Popover',
  'Radio',
  'SearchBar',
  'TabItem',
  'Tabs',
  'Title',
  'TitleBar',
  'View'
]);