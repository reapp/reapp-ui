module.exports = (c) => ({
  self: {
    background: c.bgLight,
    top: c.toolbarHeight,
    padding: `0 ${c.viewPad}`,
    overflowY: 'scroll',
    overflowX: 'hidden',
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    pointerEvents: 'all',
    WebkitOverflowScrolling: 'touch'
  }
});