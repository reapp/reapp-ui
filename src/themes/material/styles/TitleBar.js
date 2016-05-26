export default c => ({

  self: {
    minHeight: c.titleBarHeight,
    boxShadow: '0 1px 6px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.12)'
  },

  inner: {
    boxSizing: 'border-box',
    fontFamily: 'Roboto, sans-serif',
    WebkitTapHighlightColor: 'rgba(0,0,0,0)',
    borderRadius: '0px',
    background: c.titleBarBG,
    position: 'relative',
    display: '-webkit-flex',
    minHeight: c.titleBarHeight,
    paddingLeft: '24px',
    paddingRight: '24px',
    height: c.titleBarHeight,
    fontSize: c.titleBarFontSize,
    textAlign: 'center',
    top: 0,
    left: 0,
    width: '100%',
    flexFlow: 'row',
    justifyContent: 'space-between',
  },

  transparent: {
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