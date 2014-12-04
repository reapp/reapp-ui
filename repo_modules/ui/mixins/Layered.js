var React = require('react');

module.exports = {
  contextTypes: {
    layer: React.PropTypes.number
  },

  getLayer() {
    return (this.context.layer || 1);
  }
};