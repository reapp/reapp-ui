module.exports = {
  isView: true,

  contextTypes: {
    layer: React.PropTypes.number.isRequired
  },

  childContextTypes: {
    layer: React.PropTypes.number.isRequired
  },

  getChildContext() {
    return {
      layer: (this.context.layer || 0) + 1
    };
  }
};