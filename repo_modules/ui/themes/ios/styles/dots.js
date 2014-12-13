module.exports = (c) => ({
  self: {
    pointerEvents: 'none'
  },

  dot: {
    background: `rgba(${c.dotColor},0.2)`,
    borderRadius: 10,
    width: 4,
    height: 4,
    margin: 2
  },

  dotActive: {
    background: `rgb(${c.dotColor})`
  },

  inner: {
    margin: 'auto',
    flexFlow: 'row'
  }
});