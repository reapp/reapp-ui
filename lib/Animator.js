var React = require('react');

module.exports = function(name, props) {
  return {
    pickNum: (a, b) => typeof a === 'number' ? a : b,

    childContextTypes: {
      animations: React.PropTypes.object
    },

    getChildContext() {
      var animations = this.context.animations || {
        [name]: {}
      };

      var step = this.pickNum(this.props.step, this.state && this.state.step);

      if (typeof step === 'number')
        animations[name].step = step;

      if (props)
        props.forEach(prop => animations[name][prop] = this.props[prop]);

      return { animations: animations };
    },
  }
};