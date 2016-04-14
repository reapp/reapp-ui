var React = require('react');
var merge = require('lodash.merge');

module.exports = function(children, props, keepOriginalProps) {
  if (!children) return;

  return React.Children.map(children, (child, i) => {
    var curProps = (typeof props === 'function') ?
      props(child, i) :
      props;

    return React.isValidElement(child) ?
      React.cloneElement(child, keepOriginalProps ?
        Object.assign({}, child.props, curProps) :
        curProps) :
      child;
  });
};
