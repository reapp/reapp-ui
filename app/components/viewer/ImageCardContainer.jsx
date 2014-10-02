var React = require('react');
var ReactStyle = require('react-style');
var AnimatableContainer = require('../touch/AnimatableContainer');
var EasingFunctions = require('../math/EasingFunctions');
var ImageCard = require('./ImageCard');

var ImageCardContainer = React.createClass({
  styles: ReactStyle({
     'backface-visibility': 'hidden',
     '-webkit-backface-visibility': 'hidden',
     '-moz-backface-visibility': 'hidden',
     left: 0,
     position: 'absolute',
     top: 0
  }),

  render() {
    var card = this.transferPropsTo(<ImageCard />);
    var pct = (this.props.left - (this.props.index * this.props.width)) / this.props.width;
    var x = this.props.index * this.props.width - this.props.left;
    var z = Math.abs(pct * 200) * -1;
    var yAxis = this.props.left > this.props.index * this.props.width ? 1 : -1;
    var deg = Math.abs(pct * 69);

    return (
      <AnimatableContainer
        className="ImageCardContainer"
        styles={this.styles}
        opacity={EasingFunctions.easeOutCubic(1 - Math.abs(pct))}
        rotate={{y: yAxis, deg: deg}}
        translate={{x: x, z: z}}>
        {card}
      </AnimatableContainer>
    );
  }
});

module.exports = ImageCardContainer;