module.exports = (vars) => ({
  self: {
    background: vars.bgLight,
    overflowY: 'scroll',
    overflowX: 'hidden',
    position: 'absolute',
    top: vars.toolbarHeight,
    left: 0,
    bottom: 0,
    right: 0,
    pointerEvents: 'all',
    WebkitOverflowScrolling: 'touch',
    padding: '0 10px'
  }
});