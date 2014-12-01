module.exports = (vars) => ({
  self: {
    background: vars.bgLight,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    position: 'fixed',
    marginLeft: '100%',
    width: '100%'
  },

  dragger: {
    position: 'fixed',
    top: 0,
    bottom: 0,
    width: 10,
  }
});