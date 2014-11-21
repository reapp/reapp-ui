module.exports = {
  self: {
    visibility: state.open ? 'visible' : 'hidden',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: state.open ? 15000 : -1,
    background: STYLE.bg
  },

  list: {
    ':before': {
      content: ' ',
      background: STYLE.listBg,
      width: 26,
      height: 26,
      position: 'absolute',
      left: 0,
      top: 0,
      borderRadius: 3,
      transform: 'rotate(45deg)',
    },

    position: 'absolute',
    top: state.top,
    left: state.left,
    fontSize: '16px',
    background: STYLE.listBg,
    padding: 0,
    borderRadius: 5,
    textAlign: 'center'
  },

  item: {
    ':first': {
      borderTop: 'none'
    },

    minWidth: 120,
    borderTop: `1px solid ${STYLE.borderColor}`,
  }
};