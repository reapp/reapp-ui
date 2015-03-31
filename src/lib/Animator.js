var React = require('react');

const pickNum = (a, b) => typeof a === 'number' ? a : b;

module.exports = function(name, props) {
  return {
    childContextTypes: {
      animations: React.PropTypes.object
    },

    getChildContext() {
      const parentState = this.context.animations && this.context.animations[name];
      const childState = {
        [name]: Object.assign({}, parentState)
      };

      if (this.state && typeof this.state.step === 'number')
        childState[name].step = this.state.step;

      if (props)
        props.forEach(prop => childState[name][prop] = this.props[prop]);

      return { animations: childState };
    },
  }
};