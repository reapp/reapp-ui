module.exports = (c) => ({
  self: {
    background: c.barBG,
    borderColor: c.titleBarBorderColor,
    borderStyle: 'solid',
    borderWidth: 0,
    borderBottomWidth: c.onePx,
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
    position: 'relative',
    fontWeight: 500
  },

  right: {
    margin: 'auto 0'
  },

  'attach-bottom': {
    top: 'auto',
    bottom: 0,
    borderBottom: 'none',
    borderTopWidth: c.onePx
  }
});