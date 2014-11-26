var React = require('react');

module.exports = React.createClass({
  getDefaultProps() {
    return { shouldUpdate: false };
  },

  shouldComponentUpdate(nextProps) {
    return nextProps.shouldUpdate ||
      (this.props.staticKey !== nextProps.staticKey);
  },

  render() {
    return (
      <div {...this.props}>
        {this.props.children}
      </div>
    );
  }
});