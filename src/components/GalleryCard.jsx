var React = require('react');
var Component = require('../component');
var AnimatableContainer = require('../helpers/AnimatableContainer');
var EasingFunctions = require('../lib/EasingFunctions');
var GalleryImage = require('./GalleryImage');

module.exports = Component({
  name: 'GalleryCard',

  render() {
    var { left, index, width, ...props } = this.props;

    var pct = (left - (index * width)) / width;
    var x = index * width - left;
    var z = Math.abs(pct * 200) * -1;
    var yAxis = left > index * width ? 1 : -1;
    var deg = Math.abs(pct * 69);

    this.addStyles({ width });

    return (
      <AnimatableContainer
        {...this.componentProps()}
        opacity={EasingFunctions.easeOutCubic(1 - Math.abs(pct))}
        rotate={{y: yAxis, deg}}
        translate={{x, z}}>
        <GalleryImage {...props} />
      </AnimatableContainer>
    );
  }
});