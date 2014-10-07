var React = require('react');
var ReactStyle = require('react-style');

var ImageCard = React.createClass({
  styles: {
    card: function(props) {
      return ReactStyle({
        'background-image': `url(${ props.url })`,
        'background-size': 'cover',
        'background-repeat': 'no-repeat',
        'background-position': 'center',
        height: props.height,
        width: props.width,
        position: 'absolute',
        left: 0,
        top: 0
      })
    },

    img: function(props) {
      return ReactStyle({
        position: 'relative',
        height: props.height,
        width: props.width
      })
    }
  },

  render() {
    return (
      <div styles={this.styles.card(this.props)}>
        <div styles={this.styles.img(this.props)}></div>
      </div>
    );
  }
});

module.exports = ImageCard;