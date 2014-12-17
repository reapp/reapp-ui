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
    fontWeight: 500,
    zIndex: 2,
    flexFlow: 'row',
    WebkitFlexFlow: 'row',
    justifyContent: 'space-between',
    WebkitJustifyContent: 'space-between'
  },

  transparent: {
    background: 'none',
    borderBottom: 'none'
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