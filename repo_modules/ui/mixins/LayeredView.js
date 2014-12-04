var React = require('react');

module.exports = {
  childContextTypes: {
    layer: React.PropTypes.number
  },

  getChildContext() {
    return {
      layer: (this.context.layer++ || 1)
    };
  }
};