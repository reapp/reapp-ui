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

  render() {
    var { width, styles, children } = this.props;
    var widthStyle;

    if (typeof width === 'number')
      widthStyle = ReactStyle({ flex: width });
    else if (width)
      widthStyle = ReactStyle({
        flexBasis: width,
        maxWidth: width
      });
    else
      widthStyle = ReactStyle({ flex: 1 });

    return (
      <div styles={[this.style, width]}>
        <div styles={styles}>
          {children}
        </div>
      </div>
    );
  }
});

module.exports = { Container, Block };