var { hexToRGB, hexToRGBA } = require('../../../lib/ConstantsHelpers');

module.exports = c => ({
  self: {
    pointerEvents: 'none',
    WebkitAlignItems: 'center'
  },

  dot: {
    background: hexToRGBA(c.dotBG, 0.2),
    borderRadius: 10,
    width: 4,
    height: 4,
    margin: 2
  },

  dotActive: {
    background: hexToRGB(c.dotBG)
  },

  inner: {
    margin: 'auto',
    flexFlow: 'row',
    WebkitFlexFlow: 'row'
  }
});