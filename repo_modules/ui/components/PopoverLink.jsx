var React = require('react/addons');

var Popover = React.createClass({
  handleClick(e) {
    var popoverEvent = new CustomEvent(`popover-${this.props.to}`);

    window.dispatchEvent(popoverEvent);
    e.preventDefault();
  },

  render() {
    return (
      <a {...this.props} onClick={this.handleClick}>
        {this.props.children}
      </a>
    );
  }
});

module.exports = Popover;