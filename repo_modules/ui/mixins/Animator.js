var React = require('react');
var Axn = require('axn');

var pick = (a, b) => typeof a !== 'undefined' ? a : b;

module.exports = function(source) {
  var childContextTypes = {};
  childContextTypes[source] = React.PropTypes.object;

  return {
    childContextTypes,

    getChildContext() {
      var context = this.context;
      context.animations[source].step = pick(this.state.step, this.props.step);
      context.animations[source].index = pick(this.state.index, this.props.index);
      context.animations[source].disabled = pick(this.state.animationDisabled, this.props.animationDisabled);
      return context;
    },

    disableAnimation() {
      this.setState({ animationDisabled: true });
    },

    enableAnimation() {
      this.setState({ animationDisabled: false });
    }
  };
};