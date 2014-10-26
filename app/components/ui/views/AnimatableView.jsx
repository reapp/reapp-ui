var React = require('react/addons');
var Merge = require('react/lib/merge');
var ReactStyle = require('react-style');
var View = require('./View');
var AnimatableContainer = require('../helpers/AnimatableContainer');
var EasingFunctions = require('../lib/math/EasingFunctions');
var cx = React.addons.classSet;

module.exports = React.createClass({
  styles(propStyles) {
    return ReactStyle(Merge({
      top: 0,
      left: 0,
      pointerEvents: 'all',
      '-webkit-overflow-scrolling': 'touch',
      'backface-visibility': 'hidden',
      '-webkit-backface-visibility': 'hidden',
      '-moz-backface-visibility': 'hidden',
    }, propStyles));
  },

  render() {
    var { left, width, height, index, ...props } = this.props;
    console.log(left, width, height, index, props);

    var pct = (left - (index * width)) / width;
    var x = index * width - left;
    var z = Math.abs(pct * 200) * -1;
    var yAxis = left > index * width ? 1 : -1;
    var deg = Math.abs(pct * 69);

    return (
      <AnimatableContainer
        className="AnimatableViewContainer"
        styles={this.styles({ width, height })}
        opacity={EasingFunctions.easeOutCubic(1 - Math.abs(pct))}
        rotate={{y: yAxis, deg: deg}}
        translate={{x: x, z: z}}>
        {View(props)}
      </AnimatableContainer>
    );
  }
});