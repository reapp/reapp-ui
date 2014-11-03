var React = require('react/addons');

var Popover = React.createClass({
  handleClick(e) {
    var popoverEvent = new CustomEvent(`popover-${this.props.to}`, {
      detail: {
        boundingRect: e.target.getBoundingClientRect()
      }
    });
    window.dispatchEvent(popoverEvent);
    e.preventDefault();
  },

  render() {
    return (
      <a {...this.props} href="#" onClick={this.handleClick}>
        {this.props.children}
      </a>
    );
  }
});

module.exports = Popover;