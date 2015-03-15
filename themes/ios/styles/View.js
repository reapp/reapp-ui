module.exports = (c) => ({
  self: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 2
  },

  inactive: {
    pointerEvents: 'none'
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
    WebkitOverflowScrolling: 'none'
    // note, this was causing flickering on ios
    // but prevents people from moving the view as they swipe:
    // overflow: 'hidden'
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