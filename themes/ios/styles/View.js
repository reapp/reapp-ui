module.exports = (c) => ({
  self: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 2
  },

  inner: {
    background: c.viewBG,
    padding: `0 ${c.viewPad}`,
    zIndex: 1,
    position: 'absolute',
    overflowX: 'hidden',
    overflowY: 'scroll',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    WebkitOverflowScrolling: 'touch'
  },

  innerInactive: {
    pointerEvents: 'none',
    WebkitOverflowScrolling: 'none'
    // overflow: 'hidden' // note, this was causing flickering
  },

  innerActive: {
    WebkitOverflowScrolling: 'touch',
  },

  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    background: '#000',
    pointerEvents: 'none'
  }
});