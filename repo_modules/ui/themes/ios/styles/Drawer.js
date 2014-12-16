module.exports = (c) => ({
  self: {
    background: c.bgLight,
    position: 'fixed',
    width: '100%',
    height: '100%',
    pointerEvents: 'all'
  },

  right: {
    top: 0,
    left: 0
  },

  left: {
    top: 0,
    right: 0
  },

  top: {
    left: 0,
    bottom: 0
  },

  bottom: {
    left: 0,
    top: 0
  },

  dragger: {
    position: 'fixed',
    zIndex: 2,
  },

  topDragger: {
    top: 0,
    right: 0,
    left: 0,
    height: 20
  },

  rightDragger: {
    top: c.titleBarHeight,
    right: 0,
    bottom: 0,
    width: 20
  },

  bottomDragger: {
    bottom: 0,
    left: 0,
    right: 0,
    height: 20
  },

  leftDragger: {
    top: c.titleBarHeight,
    left: 0,
    bottom: 0,
    width: 20
  }
});