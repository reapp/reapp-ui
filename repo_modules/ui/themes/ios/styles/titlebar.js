module.exports = (vars) => ({
  self: {
    background: vars.titleBarBG,
    borderBottom: `1px solid ${vars.titleBarBorderColor}`,
    height: vars.titleBarHeight,
    fontSize: vars.titleBarFontSize,
    textAlign: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    padding: 0,
    flexFlow: 'row',
    fontWeight: 500,
    justifyContent: 'space-between',
    WebkitBackfaceVisibility: 'hidden',
    WebkitTransform: 'translateZ(0)'
  },

  left: {
    margin: 'auto 0'
  },

  mid: {
    color: vars.titleBarColor,
    margin: 'auto 0',
    position: 'relative'
  },

  right: {
    margin: 'auto 0'
  }
});