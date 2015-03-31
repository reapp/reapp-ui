var React = require('react');

module.exports = React.createClass({
  propTypes: {
    context: React.PropTypes.object.isRequired
  },

  componentWillMount() {
    const contextKeys = Object.keys(this.props.context);
    const childContextTypes = contextKeys.reduce(key => ({
      [key]: React.PropTypes.any
    }), {});

    debugger;

    this.childContextTypes = childContextTypes;
  },

  getChildContext() {
    return this.props.context;
  },

  render() {
    return this.props.children;
  }
});