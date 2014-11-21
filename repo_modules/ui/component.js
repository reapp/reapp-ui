var React = require('react/addons');
var ReactStyle = require('react-style');
var Styled = require('./styled');
var Classed = require('./classed');
var UI = require('./index');

module.exports = function(name, spec) {
  var mixins = [].concat(spec.mixins || [], Styled(name), Classed(name), {
    componentWillMount() {
      // combine styles and classes into one thing
      this.componentProps = () => ({
        styles: this.getStyles(),
        className: this.getClasses()
      });
    }
  });

  spec.displayName = name;
  spec.mixins = mixins;
  return React.createClass(spec);
};