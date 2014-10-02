var React = require('react');

require('./layout.css');

module.exports = React.createClass({
  render() {
    return (
      <div id='layout'>
        {this.props.children}
      </div>
    );
  }
});