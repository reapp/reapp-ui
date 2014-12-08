var Component = require('ui/component');
var ShowPopover = require('ui/actions/ShowPopover');

module.exports = Component('PopoverLink', {
  render() {
    return (
      <a {...this.props} href="#" onClick={ShowPopover.bind(this, this.props.popover)}>
        {this.props.children}
      </a>
    );
  }
});