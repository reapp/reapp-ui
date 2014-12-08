var React = require('react/addons');
var Actions = require('./Actions');

module.exports = function(children, e) {
  var target = e.target.getBoundingClientRect();

  Actions({
    popoverProps: { children, target }
  });
};