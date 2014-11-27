module.exports = (c) => ({
  self: {
    background: c.bgLight,
    overflowY: 'scroll',
    overflowX: 'hidden',
    position: 'absolute',
    top: c.toolbarHeight,
    left: 0,
    bottom: 0,
    right: 0,
    pointerEvents: 'all',
    WebkitOverflowScrolling: 'touch',
    padding: '0 10px'
  }
});