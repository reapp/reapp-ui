module.exports = c => ({
  self: {
    flex: 1,
    height: '100%'
  },
  
  fullscreen: {
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    padding: `0 ${c.viewPad}`
  }
});