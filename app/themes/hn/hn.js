var { makeTheme } = require('../../../index');
var requirer = (name) => require('./styles/' + name);

module.exports = makeTheme(requirer, [
  'Button',
  'Dots',
  'TitleBar'
]);