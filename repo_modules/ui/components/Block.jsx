var React = require('react');

module.exports = React.createClass({
  render() {
    var { children, ...props } = this.props;

    return (
      <div {...props} className="Block">
        {children}
      </div>
    );
  }
});