var React = require('react/addons');
var Component = require('ui/component');

var Container = Component('Container', {
  getDefaultProps() {
    return { pad: false };
  },

  render() {
    var { children, pad, ...props } = this.props;

    return (
      <div {...this.componentProps()}>
        {React.Children.map(children, (child, i) => {
          return child.type && child.type.isBlock ?
            React.addons.cloneWithProps(child, { pad: pad, key: i }) :
            <Block pad={pad} key={i}>{child}</Block>;
        })}
      </div>
    );
  }
});

var Block = Component('Block', {
  statics: {
    isBlock: true
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

    if (pad) this.addStyles(this.styles.padded);
    this.addStyles(this.getWidthStyle(width));

    return (
      <div
        {...props}
        {...this.componentProps()}>
        {children}
      </div>
    );
  }
});

var Pad = Component('Pad', {
  render() {
    var { children, ...props } = this.props;

    return (
      <div {...this.componentProps()}>
        {children}
      </div>
    );
  }
});

module.exports = { Container, Block, Pad };