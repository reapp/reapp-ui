module.exports = (c) => ({
  self: {
    background: c.bgLight,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 1000
  },

  underTouchable: {
    zIndex: 1
  }
});