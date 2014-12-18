var React = require('react');

module.exports = {
  propTypes: {
    scrollTop: React.PropTypes.number
  },

  getDefaultProps() {
    return {
      scrollTop: 0
    };
  }
};