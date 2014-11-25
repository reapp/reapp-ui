var ReactStyle = require('react-style');

// overrides format example for component "button":
// button: {
//   self: { // ... },
//   subEl: { // ... }
// }


// todo: make this a function that allows people to override or add styles
module.exports = getStylesObject(
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
);

function getStyles(name) {
  var styles = Object.assign({}, require('./ios/styles/' + name));

  Object.keys(styles).forEach(key => {
    styles[key] = ReactStyle(styles[key]);
  });

  return styles;
}

function getStylesObject() {
  var styles = {};

  Array.prototype.slice.call(arguments).forEach(name => {
    styles[name] = getStyles(name);
  });

  return styles;
}