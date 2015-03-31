var invariant = require('react/lib/invariant');

// todo:
// here should be a variety of stuff that would normally be supplied by Less/SASS
// color conversions, math, etc.

var ConstantsHelpers = module.exports = {
  hexToRGBObject(hex) {
    // expand shorthand hex
    if (hex.length === 4)
      hex = hex + hex.charAt(1) + hex.charAt(1) + hex.charAt(1);

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    invariant(result, `Could not convert hex ${hex} to rgb`);

    return {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    };
  },

  hexToRGB(hex) {
    var rgb = ConstantsHelpers.hexToRGBObject(hex);
    return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  },

  hexToRGBA(hex, a) {
    var rgb = ConstantsHelpers.hexToRGBObject(hex);
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${a})`;
  }
};