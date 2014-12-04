module.exports = (c) => ({
  self: {
    background: c.titleBarBG,
    borderBottom: `1px solid ${c.titleBarBorderColor}`,
    height: c.titleBarHeight,
    fontSize: c.titleBarFontSize,
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
    WebkitTransform: 'translateZ(0)',
    zIndex: 2
  },

  left: {
    margin: 'auto 0'
  },

  mid: {
    color: c.titleBarColor,
    margin: 'auto 0',
    position: 'relative'
  },

  right: {
    margin: 'auto 0'
  }
});