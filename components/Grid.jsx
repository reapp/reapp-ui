var React = require('react/addons');
var Component = require('../component');

var Container = Component({
  name: 'Container',

  propTypes: {
    pad: React.PropTypes.bool
  },

  getDefaultProps() {
    return { pad: false };
  },

  render() {
    var { children, pad, ...props } = this.props;

    return (
      <div {...this.componentProps()}>
        {React.Children.map(children, (child, i) => {
          return child.isBlock ?
            React.addons.cloneWithProps(child, { pad: pad, key: i }) :
            <Block pad={pad} key={i}>{child}</Block>;
        })}
      </div>
    );
  }
});

var Block = Component({
  name: 'Block',

  propTypes: {
    width: React.PropTypes.number,
    pad: React.PropTypes.bool
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
    var { width, pad, children, ...props } = this.props;

    if (pad)
      this.addStyles('padded');

    this.addStyles(this.getWidthStyle(width));

    return (
      <div {...this.componentProps()} {...props}>
        {children}
      </div>
    );
  }
});

var Pad = Component({
  name: 'Pad',

  render() {
    var { children, ...props } = this.props;

    return (
      <div {...this.componentProps()} {...props}>
        {children}
      </div>
    );
  }
});

module.exports = { Container, Block, Pad };