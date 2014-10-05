var React = require('react');

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
        <div style={imgStyle}></div>
      </div>
    );
  }
});

module.exports = ImageCard;