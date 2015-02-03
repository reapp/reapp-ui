module.exports = (c) => ({
  self: {
    background: c.bgLight,
    boxShadow: '0 0 10px rbga(0,0,0,0.5)',
    position: 'fixed',
    width: '100%',
    height: '100%',
    pointerEvents: 'all',
    zIndex: 4 // todo: this can be better
  },

  'from-right': {
    top: 0,
    left: 0
  },

  'from-left': {
    top: 0,
    right: 0
  },

  'from-top': {
    left: 0,
    bottom: 0
  },

  'from-bottom': {
    left: 0,
    top: 0
  },

  dragger: {
    position: 'fixed',
    zIndex: 3
  },

  topDragger: {
    top: 0,
    right: 0,
    left: 0,
    height: c.edgeWidth
  },

  rightDragger: {
    top: 0,
    left: 0,
    bottom: 0,
    width: c.edgeWidth
  },

  bottomDragger: {
    bottom: 0,
    left: 0,
    right: 0,
    height: c.edgeWidth
  },

  leftDragger: {
    top: 0,
    right: 0,
    bottom: 0,
    width: c.edgeWidth
  }
});