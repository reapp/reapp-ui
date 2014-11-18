var React = require('react');

var Block = React.createClass({
  render() {
    var { children, ...props } = this.props;

    return (
      <div {...props} className="Block">
        {children}
      </div>
    );
  }

});

module.exports = Block;