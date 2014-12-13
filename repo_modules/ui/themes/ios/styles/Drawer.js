module.exports = (c) => ({
  self: {
    background: c.bgLight,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    position: 'fixed',
    marginLeft: '100%',
    width: '100%',
    pointerEvents: 'all'
  },

  dragger: {
    position: 'fixed',
    top: 0,
    bottom: 0,
    width: 20,
    zIndex: 2,
  }
});