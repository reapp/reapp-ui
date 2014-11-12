var React = require('react');

require('./Block.styl');

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