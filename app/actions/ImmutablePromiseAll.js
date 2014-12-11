var { Promise } = require('bluebird');
var Immutable = require('immutable');

module.exports = function(promises) {
  return Promise.all(promises).then(Immutable.List);
};