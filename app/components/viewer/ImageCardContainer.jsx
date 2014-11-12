var React = require('react');
var ReactStyle = require('react-style');
var AnimatableContainer = require('ui/helpers/AnimatableContainer');
var EasingFunctions = require('ui/lib/math/EasingFunctions');
var ImageCard = require('./ImageCard');

var ImageCardContainer = React.createClass({
  styles: ReactStyle({
     'backface-visibility': 'hidden',
     '-webkit-backface-visibility': 'hidden',
     '-moz-backface-visibility': 'hidden',
     'position': 'absolute',
     'left': '0',
     'top': '0',
  }),

  render() {
    var { left, index, width, ...props } = this.props;

    var pct = (left - (index * width)) / width;
    var x = index * width - left;
    var z = Math.abs(pct * 200) * -1;
    var yAxis = left > index * width ? 1 : -1;
    var deg = Math.abs(pct * 69);

    return (
      <AnimatableContainer
        className="ImageCardContainer"
        styles={this.styles}
        opacity={EasingFunctions.easeOutCubic(1 - Math.abs(pct))}
        rotate={{y: yAxis, deg: deg}}
        translate={{x: x, z: z}}>
        <ImageCard {...props} />
      </AnimatableContainer>
    );
  }
});

module.exports = ImageCardContainer;