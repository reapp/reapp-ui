module.exports = (c) => ({
  self: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 2
  },

  // inactive: {
  //   pointerEvents: 'none'
  // },

  inner: {
    background: c.viewBG,
    zIndex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    overflow: 'hidden'
  },

  static: {
    padding: `0 ${c.viewPad}`,
    overflowY: 'scroll',
    overflowX: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 1,
    WebkitOverflowScrolling: 'touch',
    // fix nested views overlay each other
    transform: 'translateZ(0)'
  },

  plain: {
    padding: 0
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