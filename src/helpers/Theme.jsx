var React = require('react');

module.exports = React.createClass({
  propTypes: {
    animations: React.PropTypes.object.isRequired,
    styles: React.PropTypes.object.isRequired,
    constants: React.PropTypes.object.isRequired
  },

  getChildContext() {
    return {
      theme: {
        animations: this.props.animations,
        styles: this.props.styles,
        constants: this.props.constants,
      }
    }
  },

  childContextTypes: {
    theme: React.PropTypes.object
  },

  render() {
    return this.props.children;
  }
});