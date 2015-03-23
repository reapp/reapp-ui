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
    zIndex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    WebkitOverflowScrolling: 'touch'
  },

  static: {
    padding: `0 ${c.viewPad}`,
    overflowX: 'hidden',
    overflowY: 'scroll',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },

  innerInactive: {
    WebkitOverflowScrolling: 'none',
    // note, this was causing flickering on ios
    // but prevents people from moving the view as they swipe:
    pointerEvents: 'none'
  },

  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    background: '#000',
    pointerEvents: 'none'
  },

  shadow: {
    position: 'absolute',
    top: 0,
    bottom: -88,
    left: -16,
    width: 16,
    // background: '-webkit-linear-gradient(left,rgba(0,0,0,0) 0,rgba(0,0,0,0) 10%,rgba(0,0,0,.01) 50%,rgba(0,0,0,.2) 100%)',
    background: 'linear-gradient(to right,rgba(0,0,0,0) 0,rgba(0,0,0,0) 10%,rgba(0,0,0,.01) 50%,rgba(0,0,0,.2) 100%)',
    zIndex: -1,
  }
});