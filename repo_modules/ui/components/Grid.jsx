var React = require('react/addons');
var ReactStyle = require('react-style');
var cx = React.addons.classSet;

// from andreypopp/react-flexgrid

var PAD_STYLE = ReactStyle({
    padding: '15px',
  });

require('./Grid.styl');

var Container = React.createClass({
  getDefaultProps() {
    return { pad: false };
  },

  styles: ReactStyle({
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginRight: '-0.5rem',
    marginLeft: '-0.5rem'
  }),

  render() {
    var { styles, className, children, pad, ...props } = this.props;
    var styles = [].concat(this.styles, styles);
    var classes = { 'Container': true };
    classes[className] = !!className;

    return (
      <div className={cx(classes)} styles={styles}>
        {React.Children.map(children, child => React.addons.cloneWithProps(child, { pad: true }))}
      </div>
    );
  }
});

var Block = React.createClass({
  getDefaultProps() {
    return { pad: false };
  },

  styles: ReactStyle({
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 0,
    flexShrink: 0,
    paddingRight: '0.5rem',
    paddingLeft: '0.5rem'
  }),

  getWidthStyle(width) {
    var styles;

    if (typeof width === 'number')
      styles = { flex: width };
    else if (width)
      styles = { flexBasis: width, maxWidth: width };
    else
      styles = { flex: 1 };

    return ReactStyle(styles);
  },

  render() {
    var { width, styles, pad, children, className, ...props } = this.props;
    var allStyles = [].concat(styles, this.styles, this.getWidthStyle(width), (pad ? PAD_STYLE : null));
    var classes = { 'Block': true };
    classes[className] = !!className;

    return (
      <div
        {...props}
        className={cx(classes)}
        styles={allStyles}>
        <div styles={styles}>
          {children}
        </div>
      </div>
    );
  }
});

var Pad = React.createClass({
  render() {
    var { styles, className, children, ...props } = this.props;
    var allStyles = [].concat(PAD_STYLE, styles);
    var classes = { 'Pad': true };
    classes[className] = !!className;

    return (
      <div className={cx(classes)} styles={allStyles}>
        {children}
      </div>
    );
  }
});

module.exports = { Container, Block, Pad };