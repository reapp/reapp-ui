module.exports = {
  self: {
    position: 'relative'
  },

  above: {
    position: 'relative',
    zIndex: 2
  },

  below: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1
  },

  right: {
    left: 'auto'
  },

  left: {
    right: 'auto'
  }
}