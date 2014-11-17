var ReactStyle = require('react-style');

// overrides format example for component "button":
// button: {
//   self: {
//     // ...
//   },
//   other: {
//     // ...
//   }
// }

function getStyles(name) {
  var styles = Object.assign({}, require('./ios/styles/' + name));

  Object.keys(styles).forEach(key => {
    styles[key] = ReactStyle(styles[key]);
  });

  return styles;
}

function getStylesObject() {
  var styles = {};

  Array.prototype.slice.call(arguments).reduce((acc, arg) => {
    acc[arg] = getStyles(arg);
  }, styles);

  return styles;
}

module.exports = getStylesObject('button');