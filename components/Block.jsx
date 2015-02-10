var React = require('react/addons');
var Component = require('../component');

module.exports = Component({
  name: 'Block',

  propTypes: {
    width: React.PropTypes.number,
    pad: React.PropTypes.bool,
    row: React.PropTypes.bool
  },

  getDefaultProps() {
    return { pad: false };
  },

  getWidthStyle(width) {
    var styles;

    if (typeof width === 'number')
      styles = { flex: width };
    else if (width)
      styles = { flexBasis: width, maxWidth: width };
    else
      styles = { flex: 1 };

    return styles;
  },

  render() {
    var { width, pad, row, children, ...props } = this.props;

    if (pad)
      this.addStyles('pad');

    if (row)
      this.addStyles('row');

    this.addStyles(this.getWidthStyle(width));

    return (
      <div {...this.componentProps()} {...props}>
        {children}
      </div>
    );
  }
});