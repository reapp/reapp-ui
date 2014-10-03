var React = require('react');

var STYLE_LOADING = {
  color: 'gray',
  fontFamily: 'sans-serif',
  fontSize: '12px',
  left: 0,
  marginTop: -6,
  position: 'absolute',
  right: 0,
  textAlign: 'center',
  top: '50%',
};

var ImageCard = React.createClass({
  render() {
    var imgStyle = {
      backgroundImage: 'url(' + this.props.url + ')',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      height: this.props.height,
      left: 0,
      position: 'absolute',
      top: 0,
      width: this.props.width
    };

    var outerStyle = {
      height: this.props.height,
      position: 'relative',
      width: this.props.width
    };

    return (
      <div style={outerStyle}>
        <div style={STYLE_LOADING}>Loading...</div>
        <div style={imgStyle}></div>
      </div>
    );
  }
});

module.exports = ImageCard;