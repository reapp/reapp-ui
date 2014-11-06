var React = require('react');
var ReactStyle = require('react-style');

// from andreypopp/react-flexgrid

var Container = React.createClass({
  style: ReactStyle({
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginRight: '-0.5rem',
    marginLeft: '-0.5rem'
  }),

  render() {
    var styles = [].concat(this.style, this.props.styles);
    return (
      <div styles={styles}>
        {this.props.children}
      </div>
    );
  }
});

var Block = React.createClass({
  style: ReactStyle({
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 0,
    flexShrink: 0,
    paddingRight: '0.5rem',
    paddingLeft: '0.5rem'
  }),

  getWidthStyle(width) {
    if (typeof width === 'number')
      return { flex: width };

    if (width)
      return { flexBasis: width, maxWidth: width };

    return { flex: 1 };
  },

  render() {
    var { width, styles, pad, children } = this.props;
    var widthStyle = this.getWidthStyle(width);
    var otherStyles = { padding: Number(pad) * 20 };

    return (
      <div styles={[this.style].concat([widthStyle, otherStyles].map(ReactStyle))}>
        <div styles={styles}>
          {children}
        </div>
      </div>
    );
  }
});

module.exports = { Container, Block };