var React = require('react');

// todo: make this work with mounted depth?
// todo: make this work with react router depth?

module.exports = {
  isView: true,

  childContextTypes: {
    layer: React.PropTypes.number.isRequired
  },

  getChildContext() {
    return {
      layer: (this.context.layer || 0) + 1
    };
  }
};