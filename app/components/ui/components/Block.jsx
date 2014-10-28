var React = require('react');

require('./Block.styl');

var Block = React.createClass({
  render() {
    return this.transferPropsTo(
      <div className="Block">
        {this.props.children}
      </div>
    );
  }

});

module.exports = Block;