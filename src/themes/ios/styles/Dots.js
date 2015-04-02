var { hexToRGB, hexToRGBA } = require('../../../lib/ConstantsHelpers');

const dotStyle = {
  borderRadius: 10,
  width: 4,
  height: 4,
  margin: 2
};

module.exports = c => ({
  self: {
    pointerEvents: 'none',
    WebkitAlignItems: 'center'
  },

  dotInactive: Object.assign({
    background: hexToRGBA(c.dotBG, 0.2)
  }, dotStyle),

  dotActive: Object.assign({
    background: hexToRGB(c.dotBG)
  }, dotStyle),

  inner: {
    margin: 'auto',
    flexFlow: 'row',
    WebkitFlexFlow: 'row'
  }
});