var Component = require('ui/component');
var ShowPopover = require('ui/actions/ShowPopover');

module.exports = Component({
  name: 'PopoverLink',

  handleClick(e) {
    e.preventDefault();
    ShowPopover(this.props.content, e);
  },

  render() {
    return (
      <a {...this.props} href="#" onClick={this.handleClick}>
        {this.props.children}
      </a>
    );
  }
});