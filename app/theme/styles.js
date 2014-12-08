var { makeStyles } = require('ui');
var requirer = (name) => require('./styles/' + name);

module.exports = makeStyles(requirer, [
  'Button',
  'Dots',
  'ListItem',
  'TitleBar'
]);