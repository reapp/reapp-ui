module.exports = (c) => ({
  self: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    zIndex: 4 // todo: this can be better
  },

  inner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },

  'from-right': {
    top: 0,
    left: 0
  },

  'from-left': {
    top: 0,
    right: 0
  },

  'from-bottom': {
    left: 0,
    bottom: 0
  },

  'from-top': {
    left: 0,
    top: 0
  },

  dragger: {
    position: 'absolute',
    zIndex: 3
  },

  topDragger: {
    bottom: 0,
    left: 0,
    right: 0,
    height: c.edgeWidth
  },

  bottomDragger: {
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

  leftDragger: {
    top: 0,
    right: 0,
    bottom: 0,
    width: c.edgeWidth
  }
});