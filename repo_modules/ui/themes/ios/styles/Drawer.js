module.exports = (c) => ({
  self: {
    background: c.bgLight,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    position: 'fixed',
    width: '100%',
    pointerEvents: 'all'
  },

  right: {
    marginLeft: '100%'
  },

  left: {
    marginRight: '100%'
  },

  top: {
    marginBottom: '100%'
  },

  bottom: {
    marginTop: '100%'
  },

  dragger: {
    position: 'fixed',
    top: c.titleBarHeight,
    bottom: 0,
    width: 20,
    zIndex: 2,
  }
});