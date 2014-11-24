var React = require('react');
var ReactStyle = require('react-style');

var ImageCard = React.createClass({
  styles: {
    card: function(props) {
      return {
        backgroundImage: `url(${ props.url })`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height: props.height,
        width: '100%',
        position: 'absolute',
        left: 0,
        top: 0
      }
    },

    img: function(props) {
      return ReactStyle({
        position: 'relative',
        height: props.height,
        width: '100%'
      })
    }
  },

  render() {
    return (
      <div style={this.styles.card(this.props)}>
        <div styles={this.styles.img(this.props)}></div>
      </div>
    );
  }
});

module.exports = ImageCard;